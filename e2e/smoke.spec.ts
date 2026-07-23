import { test, expect } from "@playwright/test";

// Lean smoke coverage, not exhaustive: catches a broken build/deploy, not
// every interaction. Scripted conversations and the artifact panel are
// fully deterministic (no external calls) so they're safe to assert on
// directly; the free-form chat path is exercised with a mocked
// /api/chat response so CI never spends the real DeepSeek budget.

test("loads the empty state", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Ask me anything about Alex Tong.")).toBeVisible();
  await expect(page.getByRole("button", { name: "The braggadocious summary" }).first()).toBeVisible();
});

test("a scripted conversation answers and opens its artifact", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "The braggadocious summary" }).first().click();

  await expect(page.getByText("Give me a braggadocious summary of Alex Tong.")).toBeVisible();
  await expect(page.getByText("Buckle up.")).toBeVisible({ timeout: 2000 });
  // Desktop's right pane auto-opens for a scripted answer with an artifact.
  await expect(page.locator(".app-right-pane").getByText("Alex Tong — Bio / CV")).toBeVisible();
});

test("an inline entity link swaps the open artifact", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "The braggadocious summary" }).first().click();
  await expect(page.locator(".app-right-pane").getByText("Alex Tong — Bio / CV")).toBeVisible();

  await page.locator("[data-art='pentatonic']").first().click();
  await expect(page.locator(".app-right-pane").getByText("COMPANY · CURRENT")).toBeVisible();
});

test("settings modal switches the theme", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Settings" }).click();
  await expect(page.getByText("Switch the whole interface between 5 personalities.")).toBeVisible();

  await page.getByRole("button", { name: /Terminal/ }).click();
  await page.getByRole("button", { name: "Close settings" }).click();

  // Terminal theme shows a `$` prompt prefix in the chat input that Warm
  // Studio doesn't.
  await expect(page.locator("text=$").first()).toBeVisible();
});

test("free-form chat calls /api/chat and renders the reply", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ text: "This is a mocked reply for CI." }),
    });
  });

  await page.goto("/");
  await page.getByPlaceholder(/braggadocious/).fill("What's your favorite color?");
  await page.keyboard.press("Enter");

  await expect(page.getByText("This is a mocked reply for CI.")).toBeVisible({ timeout: 5000 });
});

test("desktop collapse/expand buttons minimize and restore both side panels", async ({ page }) => {
  await page.goto("/");

  const sidebarWidth = async () => (await page.locator(".app-sidebar").boundingBox())?.width ?? -1;
  const rightPaneWidth = async () => (await page.locator(".app-right-pane").boundingBox())?.width ?? -1;

  expect(await sidebarWidth()).toBeGreaterThan(200);
  expect(await rightPaneWidth()).toBeGreaterThan(200);

  await page.getByRole("button", { name: "Collapse conversations panel" }).click();
  await expect.poll(sidebarWidth).toBeLessThan(5);
  await page.getByRole("button", { name: "Expand conversations panel" }).click();
  await expect.poll(sidebarWidth).toBeGreaterThan(200);

  await page.getByRole("button", { name: "Collapse artifacts panel" }).click();
  await expect.poll(rightPaneWidth).toBeLessThan(5);
  await page.getByRole("button", { name: "Expand artifacts panel" }).click();
  await expect.poll(rightPaneWidth).toBeGreaterThan(200);
});

test("opening an artifact un-minimizes a collapsed artifacts panel", async ({ page }) => {
  await page.goto("/");
  const rightPaneWidth = async () => (await page.locator(".app-right-pane").boundingBox())?.width ?? -1;

  await page.getByRole("button", { name: "The braggadocious summary" }).first().click();
  // Wait for the panel itself (via a control only it has), not just the
  // artifact's title text — that same title also appears as a row in the
  // artifact *list*, which is already showing by default before the
  // scripted answer's delay elapses, so waiting on the text alone would
  // resolve immediately and race the collapse click below against the
  // still-pending auto-open.
  await expect(page.getByRole("button", { name: "Close artifact" })).toBeVisible();

  await page.getByRole("button", { name: "Collapse artifacts panel" }).click();
  await expect.poll(rightPaneWidth).toBeLessThan(5);

  // Clicking an inline entity link should reveal the panel again, not just
  // update content behind a still-collapsed column.
  await page.locator("[data-art='pentatonic']").first().click();
  await expect.poll(rightPaneWidth).toBeGreaterThan(200);
  await expect(page.locator(".app-right-pane").getByText("COMPANY · CURRENT")).toBeVisible();

  // Same for a freshly-sent conversation that auto-opens an artifact.
  await page.getByRole("button", { name: "Collapse artifacts panel" }).click();
  await expect.poll(rightPaneWidth).toBeLessThan(5);
  await page.getByRole("button", { name: "Current work @ Pentatonic" }).first().click();
  await expect.poll(rightPaneWidth).toBeGreaterThan(200);
});

test("mobile suggestion chips wrap to at most 2 rows on a narrow phone", async ({ browser }) => {
  // 320px is the classic smallest-supported-phone width (original iPhone
  // SE) — chip text length varies a lot by theme, so this checks the
  // narrowest realistic case across all four rather than just the default.
  for (const path of ["/", "/cyberpunk", "/medieval", "/asoiaf"]) {
    const page = await browser.newPage({ viewport: { width: 320, height: 700 } });
    await page.goto(path);
    const chips = page.locator(".suggestion-chip");
    const count = await chips.count();
    const rowYs = new Set<number>();
    for (let i = 0; i < count; i++) {
      const box = await chips.nth(i).boundingBox();
      if (box) rowYs.add(Math.round(box.y));
    }
    expect(rowYs.size, `${path} suggestion chips should wrap to at most 2 rows at 320px`).toBeLessThanOrEqual(2);
    await page.close();
  }
});

test("CV download endpoint returns a PDF", async ({ request }) => {
  const res = await request.get("/api/cv");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("application/pdf");
});

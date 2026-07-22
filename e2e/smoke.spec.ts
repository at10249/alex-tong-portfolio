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

test("CV download endpoint returns a PDF", async ({ request }) => {
  const res = await request.get("/api/cv");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toBe("application/pdf");
});

import { test, expect, type Page } from "@playwright/test";

// Playwright's built-in touchscreen API only supports tap(), not a
// multi-point drag — simulating an actual swipe needs raw CDP touch
// events instead. This is the standard recipe: touchStart at the origin,
// several touchMove steps toward the destination, then a touchEnd with
// no active points.
async function swipe(page: Page, x: number, y: number, dx: number, dy = 0, steps = 12) {
  const cdp = await page.context().newCDPSession(page);
  const send = (type: "touchStart" | "touchMove" | "touchEnd", px: number, py: number) =>
    cdp.send("Input.dispatchTouchEvent", {
      type,
      touchPoints: type === "touchEnd" ? [] : [{ x: px, y: py }],
    });
  await send("touchStart", x, y);
  for (let i = 1; i <= steps; i++) {
    await send("touchMove", x + (dx * i) / steps, y + (dy * i) / steps);
    await page.waitForTimeout(8);
  }
  await send("touchEnd", x + dx, y + dy);
}

// The sidebar/right-pane are always mounted on mobile (never `display:
// none`, see globals.css) and slid off-screen purely via `transform`, so
// `toBeVisible()` can't tell open from closed — its bounding box position
// can, since that's exactly what the transform controls. Wrapped for
// `expect.poll` since both the gesture's own release animation and the
// existing CSS transition on tap-triggered state changes take ~250ms to
// settle — checking the box synchronously right after the action races it.
// The sidebar hugs the left edge when open (box.x ~ 0); the right pane is
// narrower than the viewport and hugs the right edge instead (its right
// edge ~ viewport width), so each checks its own anchor edge.
async function isOnScreen(page: Page, selector: string, edge: "left" | "right" = "left") {
  const box = await page.locator(selector).boundingBox();
  if (!box) return false;
  if (edge === "left") return box.x > -5 && box.x < 5;
  const viewport = page.viewportSize();
  if (!viewport) return false;
  const rightEdge = box.x + box.width;
  return rightEdge > viewport.width - 5 && rightEdge < viewport.width + 5;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("swipe right from chat opens the conversations sidebar", async ({ page }) => {
  const viewport = page.viewportSize()!;
  expect(await isOnScreen(page, ".app-sidebar")).toBe(false);

  await swipe(page, viewport.width / 2, viewport.height / 2, 220);

  await expect.poll(() => isOnScreen(page, ".app-sidebar")).toBe(true);
});

test("swipe left from chat opens the artifacts pane", async ({ page }) => {
  const viewport = page.viewportSize()!;
  expect(await isOnScreen(page, ".app-right-pane", "right")).toBe(false);

  await swipe(page, viewport.width / 2, viewport.height / 2, -260);

  await expect.poll(() => isOnScreen(page, ".app-right-pane", "right")).toBe(true);
});

test("swipe right closes the artifacts pane back to chat", async ({ page }) => {
  const viewport = page.viewportSize()!;
  await page.getByRole("button", { name: "Browse artifacts" }).click();
  await expect.poll(() => isOnScreen(page, ".app-right-pane", "right")).toBe(true);

  await swipe(page, viewport.width / 2, viewport.height / 2, 260);

  await expect.poll(() => isOnScreen(page, ".app-right-pane", "right")).toBe(false);
});

test("swipe left closes the sidebar back to chat", async ({ page }) => {
  const viewport = page.viewportSize()!;
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect.poll(() => isOnScreen(page, ".app-sidebar")).toBe(true);

  await swipe(page, viewport.width / 2, viewport.height / 2, -220);

  await expect.poll(() => isOnScreen(page, ".app-sidebar")).toBe(false);
});

test("a short mostly-vertical drag is treated as a scroll, not a swipe", async ({ page }) => {
  const viewport = page.viewportSize()!;
  await swipe(page, viewport.width / 2, viewport.height / 2, 15, 220);
  // No transition to wait out here — nothing should have opened at all.
  expect(await isOnScreen(page, ".app-sidebar")).toBe(false);
  expect(await isOnScreen(page, ".app-right-pane", "right")).toBe(false);
});

test("a swipe starting in the OS back-gesture edge zone does not open the sidebar", async ({ page }) => {
  await swipe(page, 8, 300, 220);
  expect(await isOnScreen(page, ".app-sidebar")).toBe(false);
});

test("a short swipe that doesn't cross the commit threshold snaps back", async ({ page }) => {
  const viewport = page.viewportSize()!;
  await swipe(page, viewport.width / 2, viewport.height / 2, 40, 0, 20);
  await expect.poll(() => isOnScreen(page, ".app-sidebar")).toBe(false);
});

test("existing tap-based mobile nav still works alongside the gesture", async ({ page }) => {
  const viewport = page.viewportSize()!;
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect.poll(() => isOnScreen(page, ".app-sidebar")).toBe(true);
  // The backdrop spans the full screen but the sidebar (320px wide, on
  // top, z-index 40 vs. the backdrop's 35) covers most of it on a narrow
  // viewport — click the strip actually visible to the right of it.
  await page.locator(".app-sidebar-backdrop").click({ position: { x: viewport.width - 10, y: 20 } });
  await expect.poll(() => isOnScreen(page, ".app-sidebar")).toBe(false);
});

import { test, expect } from "@playwright/test";
test("postaví a po obnovení zachová chatu", async ({ page }) => {
  await page.goto("/");
  await page.getByText("Přeskočit").click();
  const before = Number(await page.getByTestId("resource-gold").textContent());
  await page.getByTestId("build-hut").click();
  await page.getByLabel("Pole 0, 0").click();
  await expect(page.getByTestId("resource-gold")).toHaveText(
    String(before - 100),
  );
  await expect(page.getByTestId("building-hut")).toHaveCount(3);
  await page.reload();
  await expect(page.getByTestId("building-hut")).toHaveCount(3);
});

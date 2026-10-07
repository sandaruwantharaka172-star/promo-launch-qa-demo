import { expect, test } from "@playwright/test";

test("validates and accepts a campaign entry", async ({ page }) => {
  await page.goto("/campaign");

  await page.getByRole("button", { name: "Submit entry" }).click();
  await expect(page.getByText("Enter your full name.")).toBeVisible();

  await page.getByLabel("Full name").fill("Alex Morgan");
  await page.getByLabel("Email").fill("alex@example.com");
  await page.getByLabel("Receipt code").fill("GH-482910");
  await page.getByLabel(/I confirm I am eligible/).check();
  await page.getByRole("button", { name: "Submit entry" }).click();

  await expect(page).toHaveURL(/\/campaign\/success\?entry=DEMO-/);
  await expect(page.getByRole("heading", { name: "Entry confirmed." })).toBeVisible();
});

test("surfaces the duplicate-entry state without losing the flow", async ({ page }) => {
  await page.goto("/campaign");
  await page.getByLabel("Full name").fill("Alex Morgan");
  await page.getByLabel("Email").fill("alex@example.com");
  await page.getByLabel("Receipt code").fill("USED-2026");
  await page.getByLabel(/I confirm I am eligible/).check();
  await page.getByRole("button", { name: "Submit entry" }).click();

  await expect(page.getByText("That receipt code has already been used for an entry.")).toBeVisible();
});

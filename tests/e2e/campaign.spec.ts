import { expect, test } from "@playwright/test";

test("validates and accepts a campaign entry", async ({ page }) => {
  await page.goto("/campaign");

  await page.getByRole("button", { name: "Submit entry" }).click();
  await expect(page.getByText("Enter your full name.")).toBeVisible();

  await page.getByRole("button", { name: "Success" }).click();
  await page.getByRole("button", { name: "Submit entry" }).click();

  await expect(page).toHaveURL(/\/campaign\/success$/);
  await expect(page.getByRole("heading", { name: "Demo entry accepted." })).toBeVisible();
  await expect(page.getByText(/DEMO-[A-Z0-9]{8}/)).toBeVisible();
});

test("surfaces the duplicate-entry state without losing the flow", async ({ page }) => {
  await page.goto("/campaign");
  await page.getByRole("button", { name: "Duplicate" }).click();
  await page.getByRole("button", { name: "Submit entry" }).click();

  await expect(page.getByText("That receipt code has already been used for an entry.")).toBeVisible();
});

test("surfaces the temporary outage state", async ({ page }) => {
  await page.goto("/campaign");
  await page.getByRole("button", { name: "Outage" }).click();
  await page.getByRole("button", { name: "Submit entry" }).click();

  await expect(page.getByText("The entry service is temporarily unavailable. Please try again shortly.")).toBeVisible();
});

test("does not treat direct success-page access as proof of an entry", async ({ page }) => {
  await page.goto("/campaign/success");

  await expect(page.getByRole("heading", { name: "No demo confirmation in this tab." })).toBeVisible();
  await expect(page.getByText(/Direct access to this page is intentionally not treated as proof/)).toBeVisible();
});

test("clears an earlier success reference when a later submission fails", async ({ page }) => {
  await page.goto("/campaign");
  await page.getByRole("button", { name: "Success" }).click();
  await page.getByRole("button", { name: "Submit entry" }).click();
  await expect(page.getByRole("heading", { name: "Demo entry accepted." })).toBeVisible();

  await page.goto("/campaign");
  await page.getByRole("button", { name: "Outage" }).click();
  await page.getByRole("button", { name: "Submit entry" }).click();
  await expect(page.getByText("The entry service is temporarily unavailable. Please try again shortly.")).toBeVisible();

  await page.goto("/campaign/success");
  await expect(page.getByRole("heading", { name: "No demo confirmation in this tab." })).toBeVisible();
});


import { test, expect } from '@playwright/test';

test.describe('Dar Lemlih storefront smoke tests', () => {
  test('hero renders sharply and locale switch updates language', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/fr$/);

    await expect(page.getByRole('heading', { name: /miel marocain/i })).toBeVisible();

    const heroImage = page.locator('img[alt*="Dar Lemlih"]');
    await expect(heroImage).toBeVisible();
    const classList = await heroImage.evaluate(node => node.getAttribute('class') ?? '');
    expect(classList).not.toContain('blur');

    await page.getByRole('button', { name: /Lang|Language/i }).click();
    await page.getByRole('button', { name: /^EN$/ }).click();

    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByRole('heading', { name: /rare moroccan honey/i })).toBeVisible();
  });
});

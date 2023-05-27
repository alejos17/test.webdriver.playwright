import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.getByPlaceholder('Buscar productos, marcas y más…').click();
  await page.getByPlaceholder('Buscar productos, marcas y más…').fill('Xbox series x');
  await page.getByPlaceholder('Buscar productos, marcas y más…').press('Enter');
  await page.getByRole('link', { name: 'Microsoft Xbox Series S 512GB Standard color blanco', exact: true }).first().click();
  await page.locator('form').filter({ hasText: 'Hasta 48 cuotasMás informaciónEnvío gratis a nivel nacionalConoce los tiempos y ' }).getByRole('button', { name: 'Agregar al carrito' }).click();
  await page.pause()
});
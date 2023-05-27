import { test, expect } from '@playwright/test';

test('comprar un producto', async ({ page }) => {
  await page.goto('https://saucedemo.com/');

  await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
  await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce')
  await page.getByRole('button', {name: 'Login'}).click()

  //trae la lista de todos los productos en la lista
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

  //NUmero ramdom basado en la longitud del contenedor de productos
  const randomIndex = Math.floor(Math.random() * itemsContainer.length)

  //Seleccionar un elemento aleatorio para sacar datos
  const randomItem = itemsContainer[randomIndex]

  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
  const expectedName = await randomItem.locator('.inventory_item_name').innerText()
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

  console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`)

  //Una accion solo sobre el elemento que estoy seleccionando.
  await randomItem.getByRole('button', {name: 'Add to cart'}).click()

  await page.locator('a.shopping_cart_link').click()

  //espera a que el boton checkout aparezca para confirmar el carrito
  expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible()

  //Verificar el producto que esta en el carrito
  const actualName = await page.locator('.inventory_item_name').innerText()
  const actualDescription = await page.locator('.inventory_item_desc').innerText()
  const actualPrice = await page.locator('.inventory_item_price').innerText()
  
  //validaciones
  expect(actualName).toEqual(expectedName)
  expect(actualDescription).toEqual(expectedDescription)
  expect(actualPrice).toEqual(expectedPrice)

  await page.pause()

});
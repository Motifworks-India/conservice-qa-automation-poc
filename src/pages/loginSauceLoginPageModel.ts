import { test, expect } from '@playwright/test';
import {
    getLocator,
    getLocatorByText,
} from '../../src/utils/locator-utils';

export const loginSauceDemoPageLocators = {

    //add to cart
    addProductToCart: () => getLocator('[data-test="add-to-cart-sauce-labs-backpack"]'),
    //click on shoping cart
    clickOnCartIcon: () => getLocator('[data-test="shopping-cart-link"]'),
    //click on item in cart
    clickOnItemInCart: () => getLocator('[data-test="item-4-title-link"]'),

    //Get the name of the inventory item name
    getTheNameOfItem: () => getLocator('[data-test="inventory-item-name"]'),
    //remove the item from cart by clicking on remove button
    removeTheItemFromCart: () => getLocator('[data-test="remove"]'),
    //Go back to the main page
    clickOnBackToProductpage: () => getLocator('[data-test="back-to-products"]'),
    //get the heading of the page
    getHeadingOfThePage: () => getLocatorByText('Swag Labs'),

};


export async function addToCart() {
    await test.step('Adding to the cart', async () => {
        await loginSauceDemoPageLocators.addProductToCart().click();
        await loginSauceDemoPageLocators.clickOnCartIcon().click();
        await loginSauceDemoPageLocators.clickOnItemInCart().click();
    });

}
export async function verifyItemNameInCart(name: string) {
    await test.step('Verify Item Name In Cart', async () => {
        const element = loginSauceDemoPageLocators.getTheNameOfItem();
        await expect(element).toHaveText(name);
    });
}
export async function removeItemFromCart() {
    await test.step('Item Removed From Cart', async () => {
        await loginSauceDemoPageLocators.removeTheItemFromCart().click();
        await loginSauceDemoPageLocators.clickOnBackToProductpage().click();
    });
}

export async function verifyHeaderOfMainPage(name: string) {
    await test.step('Main page header', async () => {
        const pageHeading = loginSauceDemoPageLocators.getHeadingOfThePage();
        await expect(pageHeading).toHaveText(name);
    });
}


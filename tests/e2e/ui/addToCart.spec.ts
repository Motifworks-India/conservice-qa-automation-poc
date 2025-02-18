import { test } from '../../../src/setup/page-setup';
import * as LoginPage from '../../../src/pages/Login/login-page';
import * as sauceLoginPage from '../../../src/pages/loginSauceLoginPageModel';
const pageURL = '/inventory.html';

test('Test3 login to page @regression', async ({ page }) => {
    await LoginPage.loginToSauceDemo();
    await sauceLoginPage.verifyHeaderOfMainPage('Swag Labs');
    console.log("Sauce lab logged in");

});
test('Test4 add to cart', async ({ page }) => {

    await LoginPage.navigateToPage(pageURL);
    await sauceLoginPage.addToCart();
    await sauceLoginPage.verifyItemNameInCart('Sauce Labs Backpack');
    console.log("Test2 still logged in using storage state");
});







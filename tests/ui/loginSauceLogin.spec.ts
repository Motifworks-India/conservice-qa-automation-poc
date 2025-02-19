import { test } from '../../config/ui/page-setup';
import * as LoginPage from '../../src/pages/Login/login-page';
import * as sauceLoginPage from '../../src/pages/loginSauceLoginPageModel';
const pageURL = '/inventory.html';
test.describe('Single Family Activations tests', () => {
    test('Test case to verify TTM integration with automation framework @SFAT-359', async ({ }) => {
        test.info().annotations.push({
            type: 'jiraKey',
            description: 'SFAT-359',
        });
        // test('Verify user login successfully', async ({ }) => {
        await LoginPage.loginToSauceDemo();
        await sauceLoginPage.verifyHeaderOfMainPage('Swag Labs');
        console.log("Sauce lab logged in");
        await sauceLoginPage.addToCart();
        await sauceLoginPage.verifyItemNameInCart('Sauce Labs Backpack');

    });
    test('Verify item added to cart successfully', async ({ }) => {
        await LoginPage.navigateToPage(pageURL);
        await sauceLoginPage.addToCart();
        await sauceLoginPage.verifyItemNameInCart('Sauce Labs Backpack');

    });
});








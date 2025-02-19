import { click, fill, gotoURL, wait } from "../../playwright-Utils/action-utils";
import { getLocator, waitFor } from "../../playwright-Utils/elements/locator-utils";
import { CONSERVICE_URLS, USER_INFO } from "../../../tests/testdata/test-data";
import { getEnvironment } from "../../helpers/environment";
import { test } from "@playwright/test";
import { BIG_TIMEOUT, STANDARD_TIMEOUT, SMALL_TIMEOUT } from "../../constants/timeout-constants";

//Added ssuce lab creds
const username = () => getLocator('[data-test="username"]');
const password = () => getLocator('[data-test="password"]');
const signInButton = () => getLocator('[data-test="login-button"]');

export async function loginToSauceDemo() {
    await test.step('Verifying loin to sauce demo', async () => {
        console.log("###### URL1=" + process.env);
        console.log("###### URL2=" + process.env.BASE_URL);
        await gotoURL(CONSERVICE_URLS.baseUrl(getEnvironment()), { timeout: BIG_TIMEOUT })
        await waitFor(username(), undefined, { timeout: STANDARD_TIMEOUT, state: 'visible' })
        await fill(username() ?? '', USER_INFO.username ?? '');
        await fill(password() ?? '', USER_INFO.password ?? '');
        await click(signInButton());
    });


}

export async function navigateToPage(url: string) {
    await gotoURL(CONSERVICE_URLS.baseUrl(getEnvironment()) + url, { timeout: BIG_TIMEOUT });
    await wait(SMALL_TIMEOUT);
}

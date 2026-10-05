import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { getLoginCredentials } from './support/credentials';

test.describe('Login Tests', () => {
    test('Verify user can login successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.openPasswordLogin();

        const { email, password } = getLoginCredentials();
        await loginPage.signIn(email, password);
        await loginPage.selectEnterprise();
        await loginPage.selectCommunicationEffectiveness();
        // my changes updated
    });
});

import { expect, test } from '@playwright/test';
import { Dashboard } from '../pages/dashboard';
import { LoginPage } from '../pages/LoginPage';
import { getLoginCredentials } from './support/credentials';

const apiUrls = (process.env.DASHBOARD_API_URLS ?? '')
    .split(',')
    .map(url => url.trim())
    .filter(Boolean);

test.describe('Dashboard', () => {
    test.skip(
        apiUrls.length === 0,
        'Set DASHBOARD_API_URLS in .env with comma-separated dashboard API paths.'
    );

    test('captures successful dashboard API responses when applying a date filter', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const dashboard = new Dashboard(page);

        await loginPage.open();
        await loginPage.openPasswordLogin();

        const { email, password } = getLoginCredentials();
        await loginPage.signIn(email, password);
        await loginPage.selectEnterprise();
        await loginPage.selectCommunicationEffectiveness();

        await expect(dashboard.clickDate.last()).toBeVisible();

        const responses = await dashboard.captureApis(apiUrls);

        expect(responses).toHaveLength(apiUrls.length);
        for (const response of responses) {
            expect(response.status).toBe(200);
            expect(response.data).toBeDefined();
        }
    });
});

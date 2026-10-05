
import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly passwordLoginLink: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly enterprise: Locator;
    readonly communicationEffectiveness: Locator;

    constructor(page: Page) {
        this.page = page;
        this.passwordLoginLink = page.getByText('Log in using password', { exact: true });
        this.username = page.getByPlaceholder('Enter User Name');
        this.password = page.getByPlaceholder('Enter Password');
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
        this.enterprise = page.getByText('QA Core Testing', { exact: true });
        this.communicationEffectiveness = page.getByText(
            'WittyParrot Communication Effectiveness',
            { exact: true },
        );
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async openPasswordLogin(): Promise<void> {
        await expect(this.passwordLoginLink).toBeVisible();
        await this.passwordLoginLink.click();
        await expect(this.username).toBeVisible();
        await expect(this.password).toBeVisible();
    }

    async signIn(email: string, password: string): Promise<void> {
        await this.username.click();
        await this.username.pressSequentially(email, { delay: 200 });
        await expect(this.username).toHaveValue(email);

        await this.password.click();
        await this.password.pressSequentially(password, { delay: 200 });
        await expect(this.password).toHaveValue(password);
        await this.password.blur();

        await expect(this.loginButton).toBeVisible();
        await expect(this.loginButton).toBeEnabled();
        await this.loginButton.click();
    }

    async selectEnterprise(): Promise<void> {
        await expect(this.enterprise).toBeVisible();
        await this.enterprise.click();
    }

    async selectCommunicationEffectiveness(): Promise<void> {
        await expect(this.communicationEffectiveness).toBeVisible();
        await this.communicationEffectiveness.click();
    }
}

import { Locator, Page } from '@playwright/test';

export interface CapturedApiResponse {
    url: string;
    status: number;
    data: unknown;
}

export class Dashboard {
    readonly page: Page;
    readonly clickDate: Locator;
    readonly clickApply: Locator;

    constructor(page: Page) {
        this.page = page;
        this.clickDate=page.locator("//button[@id='dropdownMenuButton1']");
        this.clickApply=page.locator("//button[@mattooltip='Apply']");
    }

    async captureApis(apiUrls: string[]): Promise<CapturedApiResponse[]> {
        const responsePromises = apiUrls.map(url =>
            this.page.waitForResponse(response =>
                response.url().includes(url) && response.status() === 200
            )
        );

        await this.clickDate.last().click();
        await this.clickApply.click();

        const responses = await Promise.all(responsePromises);

        return Promise.all(
            responses.map(async response => ({
                url: response.url(),
                status: response.status(),
                data: await response.json()
            }))
        );
    }
}

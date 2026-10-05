import { Page, Locator } from '@playwright/test';

export class RoleManagement {

    readonly page: Page;
    readonly admin: Locator;
    readonly rolemanagement: Locator;
    readonly roleList: Locator;
    readonly nextButton: Locator;
    readonly disabledButton: Locator;

    constructor(page: Page) {

        this.page = page;
        this.admin = page.locator("//i[@tooltip='Administration']");
        this.rolemanagement = page.locator("//span[text()='Role Management']");
        this.roleList = page.locator("//table[@class='table']/tbody/tr");
        this.nextButton = page.locator( "//span[text()='Next']");

        this.disabledButton = page.locator( "//li[@class='page-item disabled']/span/span[2]" );
    }

    async openRoleManagement(): Promise<void> {
    
        await this.admin.click();
      //  await this.rolemanagement.waitFor({ state: 'visible' });
        await this.rolemanagement.click();
    }

    async getAllRoleName(): Promise<string[]> {
        let hasMorePages = true;

        const allRoleNames: string[] = [];

        while (hasMorePages) {

            // Get all rows from current page
            const rows: Locator[] = await this.roleList.all();

            // Capture Role Name from each row
            for (const row of rows) {

                const roleName = await row
                    .locator('td')
                    .nth(0)
                    .innerText();

                console.log(`Role Name: ${roleName.trim()}`);

                allRoleNames.push(roleName.trim());
            }

            // Check whether Next button is disabled
            if (await this.disabledButton.isVisible()) {

                hasMorePages = false;

            } else {

                // Click Next button
                await this.nextButton.click();
            }
        }

        return allRoleNames;
    }
}

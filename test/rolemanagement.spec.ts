import { test, expect } from '@playwright/test';
import { RoleManagement } from '../pages/rolemanagement';
import { LoginPage } from '../pages/LoginPage';
import { getLoginCredentials } from './support/credentials';

test('Get all role names', async ({ page }) => {

    const roleManagement = new RoleManagement(page);
    const loginPage = new LoginPage(page);

    await loginPage.open();
    const { email, password } = getLoginCredentials();
    await loginPage.signIn(email, password);

    await expect(roleManagement.admin).toBeVisible();
    await roleManagement.openRoleManagement();
    await expect(roleManagement.roleList.first()).toBeVisible();

    const roleNames = await roleManagement.getAllRoleName();

    console.log('All Role Names:');
    console.log(roleNames);

    expect(roleNames.length).toBeGreaterThan(0);
});

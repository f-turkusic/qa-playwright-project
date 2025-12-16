import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('User can log in with valid credentials', async ({ page }) =>
{
    const login = new LoginPage(page);

    await login.open();
    await login.login('tomsmith', 'SuperSecretPassword!');
    await expect(page.locator('.flash.success')).toBeVisible();
});



test('Go to https://the-internet.herokuapp.com/', async ({ page }) =>
{
    const login = new LoginPage(page);

    await login.open();
    // await login.login('tomsmith', 'SuperSecretPassword!');
    // await expect(page.locator('.flash.success')).toBeVisible();
});



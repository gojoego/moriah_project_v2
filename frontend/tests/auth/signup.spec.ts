import {
    test,
    expect
} from '@playwright/test';

test.describe('Signup', () => {

    test('user can sign up successfully', async ({ page }) => {

        const timestamp = Date.now()
        const testUsername = `playwright-${timestamp}`;
        const testEmail = `playwright-${timestamp}@moriahproject.org`;
        const testPassword = `Password123!`;

        await page.goto('/auth/signup');

        await page.getByPlaceholder('Username').fill(
            testUsername
        );

        await page.getByPlaceholder('Email').fill(
            testEmail
        );

        
        await page.getByPlaceholder('Password', {
            exact: true
        }).fill(
            testPassword
        );

        await page.getByPlaceholder('Confirm Password').fill(
            testPassword
        );

        await page.getByRole('button', {
            name: 'Create Account',
        }).click();

        await expect(page)
            .toHaveURL('/user_profile');

    });

});
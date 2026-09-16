import {
    test,
    expect
} from '@playwright/test';

test.describe('Signup', () => {

    test('user can sign up successfully', async ({ page }) => {

        test.skip(
            true,
            'Disabled until Playwright uses an isolated test database'
        );

        const testId = crypto.randomUUID();
        const testDisplayName = `playwright-${testId}`;
        const testEmail = `playwright-${testId}@moriahproject.org`;
        const testPassword = `Password123!`;

        await page.goto('/auth/signup');

        await page.getByLabel('Display name').fill(
            testDisplayName
        );

        await page.getByLabel('Email').fill(
            testEmail
        );

        await page.getByLabel('Password', {
            exact: true
        }).fill(
            testPassword
        );

        await page.getByLabel('Confirm password').fill(
            testPassword
        );

        await page.getByRole('button', {
            name: 'Create Account',
        }).click();

        await expect(page)
            .toHaveURL('/user_profile');

    });

});
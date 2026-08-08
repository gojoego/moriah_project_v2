import {
    test,
    expect
} from '@playwright/test';

test.describe('Login', () => {
    
    test('user can login successfully', async ({page}) => {

        await page.goto('/auth/login');

        await page.getByPlaceholder('Email').fill(
            process.env.PLAYWRIGHT_TEST_EMAIL!
        );

        await page.getByPlaceholder('Password').fill(
            process.env.PLAYWRIGHT_TEST_EMAIL_PASSWORD!
        );

        await page.getByRole('button', {
            name: 'Log in',
        }).click();

        await expect(page)
            .toHaveURL('/user_profile');

        await expect(
            page.getByRole('heading', {
                name: 'Welcome',
            })
        ).toBeVisible();

    });
});
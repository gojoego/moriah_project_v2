import {
    test,
    expect
} from '@playwright/test';

test.describe('Logout', () => {

    test('user can log out successfully', async ({page}) => {

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

        await page.getByRole('button', {
            name: 'Log Out'
        }).click();

        expect(
            await page.evaluate(() =>
                localStorage.getItem('moriah-token')
            )
        ).toBeNull();

        await expect(page)
            .toHaveURL('/auth/login');
    });
});
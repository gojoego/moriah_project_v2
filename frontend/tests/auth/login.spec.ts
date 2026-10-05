import {
    test,
    expect
} from '@playwright/test';

test.describe('Login', () => {
    
    test('user can login successfully', async ({ page }) => {

        await page.goto('/auth/login');

        await page.getByPlaceholder('Email').fill(
            process.env.PLAYWRIGHT_TEST_EMAIL!
        );

        await page.getByPlaceholder('Password').fill(
            process.env.PLAYWRIGHT_TEST_EMAIL_PASSWORD!
        );

        const responsePromise = page.waitForResponse(
            response =>
                response.url().includes("/api/auth/login") &&
                response.request().method() === "POST"
        );

        await page
            .getByLabel("Password")
            .press("Enter");

        const response = await responsePromise;

        console.log(
            "LOGIN STATUS:",
            response.status()
        );

        console.log(
            "LOGIN STATUS:",
            response.status()
        );

        await expect(page)
            .toHaveURL("/user_profile");

        await expect(
            page.getByRole('heading', {
                name: 'Welcome',
            })
        ).toBeVisible();

    });
});
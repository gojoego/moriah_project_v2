import {
    test,
    expect,
} from "@playwright/test";

test.describe("Moriah Support chat", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });


    test("user can open and close the chat", async ({ page }) => {
        await page.getByRole("button", {
            name: "Open support chat",
        }).click();

        await expect(
            page.getByRole("heading", {
                name: "Moriah Support",
            })
        ).toBeVisible();

        await page.getByRole("button", {
            name: "Close",
            exact: true,
        }).click();

        await expect(
            page.getByRole("heading", {
                name: "Moriah Support",
            })
        ).not.toBeVisible();
    });


    test("user can submit a message and see resources", async ({
        page,
    }) => {
        await page.route(
            "**/api/chat/resources",
            async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        crisisDetected: false,
                        resources: [
                            {
                                id: "resource-1",
                                name: "Example Grief Resource",
                                description:
                                    "Support for people experiencing grief.",
                                url: "https://example.org",
                                category: "grief_support",
                                resourceType: "support_group",
                                audience: ["general"],
                                format: ["online"],
                                locationScope: null,
                                tags: [],
                                isActive: true,
                                createdAt:
                                    "2026-10-05T00:00:00.000Z",
                                updatedAt:
                                    "2026-10-05T00:00:00.000Z",
                            },
                        ],
                    }),
                });
            }
        );

        await page.getByRole("button", {
            name: "Open support chat",
        }).click();

        await page
            .getByPlaceholder("Ask about resources...")
            .fill("I need grief support");

        await page.getByRole("button", {
            name: "Send",
        }).click();

        await expect(
            page.getByText("I need grief support")
        ).toBeVisible();

        await expect(
            page.getByText("Example Grief Resource")
        ).toBeVisible();

        await expect(
            page.getByText(
                "Support for people experiencing grief."
            )
        ).toBeVisible();
    });


    test("user can press Enter to send a message", async ({
        page,
    }) => {
        await page.route(
            "**/api/chat/resources",
            async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        crisisDetected: false,
                        resources: [],
                    }),
                });
            }
        );

        await page.getByRole("button", {
            name: "Open support chat",
        }).click();

        const input = page.getByPlaceholder(
            "Ask about resources..."
        );

        await input.fill("Something very specific");
        await input.press("Enter");

        await expect(
            page.getByText("Something very specific")
        ).toBeVisible();

        await expect(
            page.getByText(
                /couldn't find a matching resource/i
            )
        ).toBeVisible();
    });


    test("quick action submits a resource request", async ({
        page,
    }) => {
        await page.route(
            "**/api/chat/resources",
            async (route) => {
                const body = route.request().postDataJSON();

                expect(body).toEqual({
                    message: "grief support",
                });

                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        crisisDetected: false,
                        resources: [],
                    }),
                });
            }
        );

        await page.getByRole("button", {
            name: "Open support chat",
        }).click();

        await page.getByRole("button", {
            name: "Grief support",
        }).click();

        await expect(
            page.getByText("grief support", {
                exact: true,
            }).last()
        ).toBeVisible();
    });


    test("crisis response shows immediate support message", async ({
        page,
    }) => {
        await page.route(
            "**/api/chat/resources",
            async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: "application/json",
                    body: JSON.stringify({
                        crisisDetected: true,
                        resources: [
                            {
                                id: "crisis-1",
                                name: "988 Suicide & Crisis Lifeline",
                                description:
                                    "Immediate crisis support.",
                                url: "https://988lifeline.org",
                                category: "crisis_support",
                                resourceType: "crisis_line",
                                audience: ["general"],
                                format: ["phone"],
                                locationScope: null,
                                tags: [],
                                isActive: true,
                                createdAt:
                                    "2026-10-05T00:00:00.000Z",
                                updatedAt:
                                    "2026-10-05T00:00:00.000Z",
                            },
                        ],
                    }),
                });
            }
        );

        await page.getByRole("button", {
            name: "Open support chat",
        }).click();

        await page
            .getByPlaceholder("Ask about resources...")
            .fill("I want to die");

        await page.getByRole("button", {
            name: "Send",
        }).click();

        await expect(
            page.getByText("Immediate support resources")
        ).toBeVisible();

        await expect(
            page.getByText("988 Suicide & Crisis Lifeline")
        ).toBeVisible();
    });
});
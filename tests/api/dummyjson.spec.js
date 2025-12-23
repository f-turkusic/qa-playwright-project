import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://dummyjson.com/auth';

let DATA_USR_PAS = {
    "username": "emilys",
    "password": "emilyspass"
};

let accessToken;
let refreshToken

async function getProtected(request, url)
{
    let response = await request.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    // If token expired
    if (response.status() === 401)
    {
        console.log("Access token expired, refreshing...");
        await refreshAccessToken();

        // Retry
        response = await playwrightRequest.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
    }

    return response;
}

// Helper to refresh token
async function refreshAccessToken()
{
    const response = await playwrightRequest.post(
        "https://dummyjson.com/auth/refresh",
        {
            headers: { "Content-Type": "application/json" },
            data: { refreshToken }
        }
    );

    expect(response.status()).toBe(200);
    const body = await response.json();
    accessToken = body.accessToken;
}

// Authenticate once
test.beforeAll(async ({ request }) =>
{
    const loginResponse = await request.post("https://dummyjson.com/auth/login", {
        headers: { "Content-Type": "application/json" },
        data: { username: "emilys", password: "emilyspass" }
    });

    expect(loginResponse.status()).toBe(200);
    const body = await loginResponse.json();
    accessToken = body.accessToken;
    refreshToken = body.refreshToken;
    expect(accessToken).toBeTruthy();
});

test.describe('dummyjson API tests', () =>
{
    test("GET /auth/me returns logged-in user", async ({ request }) =>
    {
        const response = await request.get(
            "https://dummyjson.com/auth/me",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        expect(response.status()).toBe(200);

        const user = await response.json();
        expect(user.username).toBe("emilys");
    });

    test("GET /auth/me with refresh support", async ({ request }) =>
    {
        const response = await getProtected(request, "https://dummyjson.com/auth/me");
        expect(response.status()).toBe(200);

        const user = await response.json();
        expect(user.username).toBe("emilys");
    });
});



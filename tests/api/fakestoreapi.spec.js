import { test, expect } from '@playwright/test';

const BASE_URL = 'https://fakestoreapi.com/auth';

let DATA_USR_PAS = {
    username: 'mor_2314',
    password: '83r5^_'
};

test.describe('fakestoreapi API tests', () =>
{

    test('GET users list', async ({ request }) =>
    {
        const response = await request.get(`${BASE_URL}/users?page=2`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.page).toBe(2);
        expect(body.data.length).toBeGreaterThan(0);
    });

    test('GET single user', async ({ request }) =>
    {
        const response = await request.get(`${BASE_URL}/users/2`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.data.id).toBe(2);
        expect(body.data).toHaveProperty('email');
    });

    test('POST login - success', async ({ request }) =>
    {
        const response = await request.post(`${BASE_URL}/login`, {
            headers: {
                "Content-Type": "application/json"
            },
            data: DATA_USR_PAS
        });

        expect([200, 201]).toContain(response.status());

        const body = await response.json();
        expect(body).toHaveProperty('token');
        expect(body.token.length).toBeGreaterThan(10);
    });

    test("FakeStore login", async ({ request }) =>
    {
        const response = await request.post(
            `${BASE_URL}/login`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                data: DATA_USR_PAS
            }
        );

        console.log(await response.text());
        expect([200, 201]).toContain(response.status());

        const body = await response.json();
        expect(body.token).toBeTruthy();
    });


    test('POST login - missing password (negative)', async ({ request }) =>
    {
        const response = await request.post(`${BASE_URL}/login`, {
            data: {
                email: 'eve.holt@reqres.in'
            }
        });

        expect(response.status()).toBe(400);

        const body = await response.json();
        expect(body.error).toBe('Missing password');
    });

    test('POST create user', async ({ request }) =>
    {
        const response = await request.post(`${BASE_URL}/users`, {
            data: {
                name: 'Faruk',
                job: 'QA Engineer'
            }
        });

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body.name).toBe('Faruk');
        expect(body.job).toBe('QA Engineer');
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('createdAt');
    });

});

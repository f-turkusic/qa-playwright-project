import { test, expect } from '@playwright/test';

// test('GET users list', async ({ request }) =>
// {
//     const response = await request.get('https://reqres.in/api/users?page=2');

//     expect(response.status()).toBe(200);

//     const body = await response.json();
//     expect(body.data.length).toBeGreaterThan(0);
// });

test('GET users list', async ({ request }) =>
{
    const response = await request.get('https://reqres.in/api/users?page=2', {
        headers: {
            'Accept': 'application/json'
        }
    });

    console.log(response.status());
    console.log(await response.text());

    expect(response.status()).toBe(200);
});

test('GET posts', async ({ request }) =>
{
    const response = await request.get(
        'https://jsonplaceholder.typicode.com/posts'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
});



test('Create user', async ({ request }) =>
{
    const response = await request.post('https://reqres.in/api/users', {
        data: {
            name: 'Faruk',
            job: 'QA Engineer'
        }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe('Faruk');
});

test('Auth flow', async ({ request }) =>
{
    const login = await request.post('https://dummyjson.com/auth/login', {
        data: {
            username: 'kminchelle',
            password: '0lelplR'
        }
    });

    expect(login.status()).toBe(200);

    const token = (await login.json()).token;

    const response = await request.get(
        'https://dummyjson.com/auth/products',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    expect(response.status()).toBe(200);
});

test('Login to DummyJSON', async ({ request }) =>
{
    const response = await request.post(
        'https://dummyjson.com/auth/login',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: 'kminchelle',
                password: '0lelplR'
            }
        }
    );

    console.log('STATUS:', response.status());
    console.log('BODY:', await response.json());

    expect(response.status()).toBe(200);
});

test('Login to DummyJSON 2', async ({ request }) =>
{
    const response = await request.post(
        'https://dummyjson.com/auth/login',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: 'kminchelle',
                password: '0lelplR'
            }
        }
    );

    console.log('STATUS:', response.status());
    console.log('BODY:', await response.json());

    expect(response.status()).toBe(200);
});
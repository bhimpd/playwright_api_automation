import { test, expect } from '@playwright/test';
import dotenv from "dotenv";
dotenv.config();

import { assertPositiveInteger,assertNonEmptyString } from './helper/helperFunction';

const goRestBaseURL = process.env.GOREST_BASEURL;
const token = process.env.GOREST_TOKEN;

if (!goRestBaseURL || !token) {
    throw new Error("GOREST_BASEURL or TOKEN is not defined in your .env file..Check it Out.....");
}

test.describe("Users API...", () => {
    test("POSITIVE : GET API - Assert each object has required properties", async ({ request }) => {
        const response = await request.get(`${goRestBaseURL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log("BODY DATA :: ", body);

        // Check response is an array
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);

        // Loop over each object and check required properties
        for (const user of body) {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('gender');
            expect(user).toHaveProperty('status');
        }
    });

    test("POSITIVE : GET API - Assert each object has required properties and values", async ({ request }) => {
        const response = await request.get(`${goRestBaseURL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log("BODY DATA :: ", body);

        // Check response is an array
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);

        // Loop over each object and check required properties
        for (const user of body) {
            expect(user).toHaveProperty('id');
            assertPositiveInteger(user.id);

            expect(user).toHaveProperty('name');
            assertNonEmptyString(user.id);

            expect(user).toHaveProperty('email');
            assertNonEmptyString(user.email);

            expect(user).toHaveProperty('gender');
            assertNonEmptyString(user.gender);

            expect(user).toHaveProperty('status');
            assertNonEmptyString(user.status);
        }

    });

});

import { test, expect } from '@playwright/test';
import dotenv from "dotenv";
dotenv.config();

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
});

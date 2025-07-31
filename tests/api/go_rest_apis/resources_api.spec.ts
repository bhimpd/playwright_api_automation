import {test, expect, request} from '@playwright/test';
import dotenv from "dotenv";
dotenv.config();

const goRestBaseURL =  process.env.GOREST_BASEURL;
const token = process.env.GOREST_TOKEN;

if (!goRestBaseURL || !token){
    throw new Error("GOREST_BASEURL or TOKEN is not defined in your .env file..Check it Out.....");
}

test.describe("Users API...", () => {
    test("POSITIVE : GET API - Fetch the users", async({request}) => {

        const response = await request.get(`${goRestBaseURL}/users`, {

        });

        console.log("BASEURLLL ::",goRestBaseURL);

        expect (response.status()).toBe(200);
        const body = await response.json();
        console.log("BODY DATA :: ",  body);

        expect (Array.isArray(body)).toBe(true);

        const bodyLength =  body.length;
        expect (bodyLength).toBeGreaterThan(0);

    });
})
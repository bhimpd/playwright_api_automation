import {test,expect} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

import { assertSuccessfulResponse,assertUserDataResponse,assertSingleDataResponse, assertSupportInfo,assertSingleUserDataResponse} from "./utilis/validator";
import formData  from "../testdata/user_form_data.json"

const baseURL = process.env.API_BASEURL;
const apiKey = process.env.API_KEY;

if (!baseURL || !apiKey) {
  throw new Error("API_BASEURL or API_KEY is not defined in your .env file..Check it Out.....");
}

test.describe("GET: API – Fetch User Data", () => {
  const testCases = [
    { perPage: 6, page: 1, description: "default pagination (per_page=6, page=1)" },
    { perPage: 10, page: 1, description: "per_page=10 and page=1" },
    { perPage: 10, page: 2, description: "per_page=10 and page=2" },
  ];

  testCases.forEach(({ perPage, page, description }) => {
    test(`GET: ${description}`, async ({ request }) => {
      const response = await request.get(`${baseURL}/users?page=${page}&per_page=${perPage}`, {
        headers: { "x-api-key": apiKey },
      });

      const data = await assertSuccessfulResponse(response, page, perPage);

      const usersData = data.data;
      expect(usersData.length).toBeGreaterThan(0);
      expect(usersData.length).toBeLessThanOrEqual(perPage);

      const ids = new Set();
      const emails = new Set();

      usersData.forEach((user: any, index: number) => {
        assertUserDataResponse(user, index);
        
        // Add to sets
        ids.add(user.id);
        emails.add(user.email);

      });

    // ✅ Uniqueness check
    expect(ids.size).toBe(usersData.length);
    expect(emails.size).toBe(usersData.length);

    console.log("ID SIZE :: ", ids.size);
    console.log("EMAILS SIZE :: ", emails.size);
    console.log("USERS DATAT :: ", usersData.length);

      
    });
  });
});

test.describe("GET : API - Fetch single user data", () => {
  test("Positive :: Get API - fetching single user", async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${baseURL}/user?id=${userId}`, {
      headers: { "x-api-key": apiKey },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    console.log("USER DATA :: ", data);

    const userData = data.data;
    const supportInfo = data.support;

    assertSingleDataResponse(userData);
    assertSupportInfo(supportInfo);
  });

  const invalidUserIds = [1111, -123, 0, "abc"];

  invalidUserIds.forEach((userId) => {
    test(`Negative :: Get API - user not found for ID: ${userId}`, async ({ request }) => {
      const response = await request.get(`${baseURL}/user?id=${userId}`, {
        headers: { "x-api-key": apiKey },
      });

      expect(response.status()).toBe(404);

      const data = await response.json();
      console.log(`USER DATA for ID ${userId} ::`, data);

      // Assuming empty response object
      expect(data).toEqual({});
    });
  });
});



test.describe("PUT : Update the User", () => {
  test("Positive : PUT : Update the user with valid data", async ({request})=>{
    const userId = 1;
    const response = await request.put(`${baseURL}/users/${userId}`, {
      headers:{ "x-api-key" : apiKey},
      form :formData
    });

    expect (response.status()).toBe(200);
    const data = await response.json();

    assertSingleUserDataResponse(data);
   
  });

  test("Negative : PUT : Update the user without  id in the url", async ({request})=>{
    const response = await request.put(`${baseURL}/users`, {
      headers:{ "x-api-key" : apiKey},
      form :formData
    });

    expect (response.status()).toBe(404);
   
  });

})


test.describe("PATCH : Update the User", () => {
  test("Positive : PATCH : Update the user with valid data", async ({request})=>{
    const userId = 1;
    const response = await request.patch(`${baseURL}/users/${userId}`, {
      headers:{ "x-api-key" : apiKey},
      form :formData
    });

    expect (response.status()).toBe(200);
    const data = await response.json();

    assertSingleUserDataResponse(data);
   
  });

  test("Negative : PATCH : Update the user without  id in the url", async ({request})=>{
    const response = await request.patch(`${baseURL}/users`, {
      headers:{ "x-api-key" : apiKey},
      form :formData
    });

    expect (response.status()).toBe(404);
   
  });

})

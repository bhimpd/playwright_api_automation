import {test,expect} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

import { assertSuccessfulResponse,assertUserDataResponse } from "./utilis/validator";

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

      usersData.forEach((user: any, index: number) => {
        assertUserDataResponse(user, index);
      });
      
    });
  });
});
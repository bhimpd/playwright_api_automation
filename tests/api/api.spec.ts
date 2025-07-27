import {test,expect} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

const baseURL = process.env.API_BASEURL;
const apiKey = process.env.API_KEY;

if (!baseURL || !apiKey) {
  throw new Error("API_BASEURL or API_KEY is not defined in your .env file..Check it Out.....");
}


test("API Test using baseURL from config", async ({ request }) => {
  console.log("BASE URL ::  ", baseURL);

  const response = await request.get(`${baseURL}/users`, {
    headers :{
      "x-api-key": apiKey
    }
  });

  expect(response.status()).toBe(200);
  const data = await response.json();

  console.log("DATA ::: ", data);

  expect (data).toHaveProperty("page");
  expect (Number.isInteger(data.page)).toBe(true);

  expect (data).toHaveProperty("per_page");
  expect (Number.isInteger(data.per_page)).toBe(true);

  expect (data).toHaveProperty("total");
  expect (Number.isInteger(data.total)).toBe(true);

  expect (data).toHaveProperty("total_pages");
  expect (Number.isInteger(data.total_pages)).toBe(true);

  expect (data).toHaveProperty("data");
  expect (Array.isArray(data.data)).toBe(true);

});
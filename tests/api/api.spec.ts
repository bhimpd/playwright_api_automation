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
});
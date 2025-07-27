import {test,expect} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

import { assertSuccessfulResponse,assertUserDataResponse } from "./utilis/validator";

const baseURL = process.env.API_BASEURL;
const apiKey = process.env.API_KEY;

if (!baseURL || !apiKey) {
  throw new Error("API_BASEURL or API_KEY is not defined in your .env file..Check it Out.....");
}


test("GET: API :Fetch the Users Data- default Pagination", async ({ request }) => {
  console.log("BASE URL ::  ", baseURL);

  const response = await request.get(`${baseURL}/users`, {
    headers :{
      "x-api-key": apiKey
    }
  });

  const data = await assertSuccessfulResponse(response); 
 
  const dataLength = data.data.length;

  console.log("User data length :: ",dataLength);

  expect (dataLength).toBeGreaterThan(0);
  expect (dataLength).toBeLessThanOrEqual(6);

  const usersData = data.data;

  usersData.forEach((user: any, index:number) =>{
    assertUserDataResponse(user,index);
  });

});
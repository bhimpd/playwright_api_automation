import {test,expect} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

import { assertSuccessfulResponse,assertUserDataResponse } from "./utilis/validator";

const baseURL = process.env.API_BASEURL;
const apiKey = process.env.API_KEY;

if (!baseURL || !apiKey) {
  throw new Error("API_BASEURL or API_KEY is not defined in your .env file..Check it Out.....");
}


test.describe("GET:APi -- Fetch the User Data...", ()=>{

  test("GET: API :Fetch the Users Data- default Pagination - ie per_page 6 and page no 1", async ({ request }) => {
    console.log("BASE URL ::  ", baseURL);

    const perPage = 6;
    const page = 1;
  
    const response = await request.get(`${baseURL}/users?page=${page}&per_page=${perPage}`, {
      headers :{
        "x-api-key": apiKey
      }
    });
  
    const data = await assertSuccessfulResponse(response, page, perPage);
   
    const dataLength = data.data.length;
  
    console.log("User data length :: ",dataLength);
  
    expect (dataLength).toBeGreaterThan(0);
    expect (dataLength).toBeLessThanOrEqual(perPage);
  
    const usersData = data.data;
  
    usersData.forEach((user: any, index:number) =>{
      assertUserDataResponse(user,index);
    });
  
  });

  test("GET: Users with per_page=10 and page 1", async ({ request }) => {
    const perPage =10;
    const page = 1;
    const response = await request.get(`${baseURL}/users?page=${page}&per_page=${perPage}`, {
      headers: {
         "x-api-key": apiKey 
        }
    });

    const data = await assertSuccessfulResponse(response, page, perPage);

    const dataLength = data.data.length;
    console.log("Total Data Length ::",dataLength);
    
    expect (dataLength).toBeGreaterThan(0);
    expect (dataLength).toBeLessThanOrEqual(perPage);
  
    const usersData = data.data;
  
    usersData.forEach((user: any, index:number) =>{
      assertUserDataResponse(user,index);
    });

  });


  test("GET: Users with per_page=10 and page 2", async ({ request }) => {
    const perPage =10;
    const page = 2;
    const response = await request.get(`${baseURL}/users?page=${page}&per_page=${perPage}`, {
      headers: {
         "x-api-key": apiKey 
        }
    });

    const data = await assertSuccessfulResponse(response, page, perPage);

    const dataLength = data.data.length;
    console.log("Total Data Length ::",dataLength);
    
    expect (dataLength).toBeGreaterThan(0);
    expect (dataLength).toBeLessThanOrEqual(perPage);
  
    const usersData = data.data;
  
    usersData.forEach((user: any, index:number) =>{
      assertUserDataResponse(user,index);
    });

  });

});


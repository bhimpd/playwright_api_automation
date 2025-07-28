import {test,expect} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

import { assertSuccessfulResponse,assertResourceDataResponse } from "./utilis/validator";

const baseURL = process.env.API_BASEURL;
const apiKey = process.env.API_KEY;

if (!baseURL || !apiKey) {
  throw new Error("API_BASEURL or API_KEY is not defined in your .env file..Check it Out.....");
}

test.describe("GET: API – Fetch Resources Data", ()=>{

    const testCases = [
        { perPage: 6, page: 1, description: "default pagination (per_page=6, page=1)" },
        { perPage: 10, page: 1, description: "per_page=10 and page=1" },
        { perPage: 10, page: 2, description: "per_page=10 and page=2" },
      ];

    testCases.forEach(({ perPage, page, description }) => {
        test(`GET: ${description}`, async ({ request }) => {
          const response = await request.get(`${baseURL}/resource?page=${page}&per_page=${perPage}`, {
            headers: { "x-api-key": apiKey },
          });
        
        const data = await assertSuccessfulResponse(response, page, perPage);

        const resourceData = data.data;
        const resourceLength = resourceData.length;

        console.log("RESOURCE DATA LENGTH :: ", resourceLength);

        const ids = new Set();

        resourceData.forEach((resource:any, index:number) => {

            assertResourceDataResponse(resource,index);
            ids.add(resource.id);

        })

        expect(ids.size).toBe(resourceLength);
        console.log("IDS SIZE :: ", ids.size)
       
        });
    });
    
});
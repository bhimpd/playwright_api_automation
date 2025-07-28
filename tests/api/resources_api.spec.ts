import {test,expect} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

import { assertSuccessfulResponse,assertUserDataResponse } from "./utilis/validator";

const baseURL = process.env.API_BASEURL;
const apiKey = process.env.API_KEY;

if (!baseURL || !apiKey) {
  throw new Error("API_BASEURL or API_KEY is not defined in your .env file..Check it Out.....");
}

test.describe("GET: API – Fetch Resources Data", ()=>{

    test("GET: API - fetch Resource Data default pagination", async({request})=>{
        
        const response = await request.get(`${baseURL}/resource`,{
            headers: { "x-api-key": apiKey },
        });
        
        const page =1;
        const perPage =6;

        const data = await assertSuccessfulResponse(response, page, perPage);

        const resourceData = data.data;
        const resourceLength = resourceData.length;

        console.log("RESOURCE DATA LENGTH :: ", resourceLength);

        const ids = new Set();

        resourceData.forEach((resource:any, index:number) => {
            expect(resource).toHaveProperty("id");
            expect (Number.isInteger(resource.id)).toBe(true);
            expect(resource.id).toBeGreaterThan(0);      

            expect(resource).toHaveProperty("name");
            expect (typeof (resource.name)).toBe("string");
            expect(resource.name.trim().length).toBeGreaterThan(0);

            expect(resource).toHaveProperty("year");
            expect (Number.isInteger(resource.year)).toBe(true);
            expect(resource.year).toBeGreaterThan(0);
        
            expect(resource).toHaveProperty("color");
            expect (typeof (resource.color)).toBe("string");
            expect(resource.color.trim().length).toBeGreaterThan(0);

            expect(resource).toHaveProperty("pantone_value");
            expect (typeof (resource.pantone_value)).toBe("string");
            expect(resource.pantone_value.trim().length).toBeGreaterThan(0);
        
            ids.add(resource.id);
        })

        expect(ids.size).toBe(resourceLength);
        console.log("IDS SIZE :: ", ids.size)
    });
});
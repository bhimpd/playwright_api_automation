import {test,expect} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

import formData  from "../testdata/user_form_data.json"
import { assertPositiveInteger,assertNonEmptyString } from "./utilis/fieldValidators";

const baseURL = process.env.API_BASEURL;
const apiKey = process.env.API_KEY;

if (!baseURL || !apiKey) {
  throw new Error("API_BASEURL or API_KEY is not defined in your .env file..Check it Out.....");
}

test.describe("POST:API : Create the User", () => {

    test("Positive:: Create the user with valid data", async({request}) => {
        const response = await request.post(`${baseURL}/register`, {
            headers: { "x-api-key": apiKey },
            form :formData.loginUser
          });

          expect (response.status()).toBe(200);
          const body = await response.json();

          console.log("BODY :: ", body);
          expect (body).toHaveProperty("id");

          assertPositiveInteger(body.id,"id");

          expect (body).toHaveProperty("token");
          assertNonEmptyString(body.token,"token");
    });

    test("Negative:: Create the user with missing email", async({request}) => {
        const form = { ...formData.loginUser } as any;
        delete form.email;  

        const response = await request.post(`${baseURL}/register`, {
            headers: { "x-api-key": apiKey },
            form :form
          });

          expect (response.status()).toBe(400);
          const body = await response.json();

          expect (body.error).toBe("Missing email or username");
    });
});
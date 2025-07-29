import {test,expect} from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

import formData  from "../testdata/user_form_data.json"
import { assertPositiveInteger, assertNonEmptyString, assertValidIsoDate } from "./utilis/fieldValidators";

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

    test("Negative:: Create the user with missing email parameter", async({request}) => {
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

    test("Negative:: Create the user with missing password parameter", async({request}) => {
        const form = { ...formData.loginUser } as any;
        delete form.password;  

        const response = await request.post(`${baseURL}/register`, {
            headers: { "x-api-key": apiKey },
            form :form
          });

          expect (response.status()).toBe(400);
          const body = await response.json();

          expect (body.error).toBe("Missing password");
    });


    test("Positive : Register the User", async({request}) =>{
        const response = await request.post(`${baseURL}/registerUser`, {
            headers: { "x-api-key": apiKey },
            form :formData.loginUser
          });

        expect (response.status()).toBe(201);
        const data = await response.json();
        console.log("REGISTERED DATA :: ", data);

        expect(data.email).toBe(formData.loginUser.email);
        expect(data.user_name).toBe(formData.loginUser.user_name);
        expect(data.password).toBe(formData.loginUser.password);

        assertPositiveInteger(data.id,"id")
      
        assertValidIsoDate(data.createdAt, "createdAt");
    });

});


test.describe("POST:API : Login the User", () =>{
    test("Positive: Login the user witht the valid user data..", async({request})=>{
        const response = await request.post(`${baseURL}/login`,{
            headers: { "x-api-key": apiKey },
            form:{
                "username":"eve.holt@reqres.in",
                "password":"Password1!"
            }
        })

        expect (response.status()).toBe(200);

        const body =  await response.json();
        console.log("BODY DATA :: ",body);

        expect (body).toHaveProperty("token");
        assertNonEmptyString(body.token,"token")
    });
});


const negativeLoginTests = [
{
    name: "Login with non-existing user",
    payload: {
        username: "test@gmail.com",
        password: "Password1!"
        },
    expectedError: "user not found"
},
{
    name: "Login with missing username or email",
    payload: {
        password: "Password1!"
        },
    expectedError: "Missing email or username"
},
{
    name: "Login with missing password",
    payload: {
        username: "eve.holt@reqres.in"
        },
    expectedError: "Missing password"
}
];
     
function removeUndefined(obj: Record<string, any>) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}

test.describe("Negative Login Scenarios", () => {
    negativeLoginTests.forEach(({ name, payload, expectedError }) => {
        test(name, async ({ request }) => {
            const cleanPayload = removeUndefined(payload);

            const response = await request.post(`${baseURL}/login`, {
                headers: { "x-api-key": apiKey },
                form: cleanPayload
            });
            
            expect(response.status()).toBe(400);

            const body = await response.json();
            console.log(`BODY for "${name}" ::`, body);

            expect(body).toHaveProperty("error");
            expect(body.error).toBe(expectedError);
        });
    });
});
      



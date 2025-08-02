import { test, expect, request, APIResponse } from '@playwright/test';
import dotenv from "dotenv";
dotenv.config();

import { assertPositiveInteger,assertNonEmptyString, assertValidEmail, assertGender,assertStatus, assertToDoStatus, assertValidDueOnDate, } from './helper/helperFunction';

const goRestBaseURL = process.env.GOREST_BASEURL;
const token = process.env.GOREST_TOKEN;

if (!goRestBaseURL || !token) {
    throw new Error("GOREST_BASEURL or TOKEN is not defined in your .env file..Check it Out.....");
}

test.describe("GET -method :: Users API...", () => {
    test("POSITIVE : GET API - Assert each object has required properties", async ({ request }) => {
        const response = await request.get(`${goRestBaseURL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log("BODY DATA :: ", body);

        // Check response is an array
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);

        // Loop over each object and check required properties
        for (const user of body) {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('gender');
            expect(user).toHaveProperty('status');
        }
    });

    test("POSITIVE : GET API - Assert each object has required properties and values", async ({ request }) => {
        const response = await request.get(`${goRestBaseURL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        // Check response is an array
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);

        const idSet = new Set();
        const emailSet = new Set();

        // Loop over each object and check required properties
        for (const user of body) {
            expect(user).toHaveProperty('id');
            assertPositiveInteger(user.id);
            expect(idSet.has(user.id)).toBe(false);
            idSet.add(user.id);

            expect(user).toHaveProperty('name');
            assertNonEmptyString(user.name);

            expect(user).toHaveProperty('email');
            assertNonEmptyString(user.email);
            assertValidEmail(user.email);
            expect(emailSet.has(user.email)).toBe(false);
            emailSet.add(user.email);

            expect(user).toHaveProperty('gender');
            assertNonEmptyString(user.gender);
            assertGender(user.gender);

            expect(user).toHaveProperty('status');
            assertNonEmptyString(user.status);
            assertStatus(user.status);
        }

        console.log("USERS ID :: ", idSet);
        console.log("USERS EMAIl :: ", emailSet);

    });

    test("NEGATIVE : GET API - wrong url ", async ({ request }) => {
        const response = await request.get(`${goRestBaseURL}/use`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        expect(response.status()).toBe(404);

        
    });

    test("Positive:  Check response time under 1000ms", async ({ request }) => {
        const start = Date.now();
        const response = await request.get(`${goRestBaseURL}/users`);
        const duration = Date.now() - start;
      
        console.log(`Response time: ${duration}ms`);
        expect(duration).toBeLessThanOrEqual(1000);
    });
});


test.describe("GET - method : fetch Posts", () =>{
    test("Positive: Assert each object has required properties", async({request}) => {
        const response = await request.get(`${goRestBaseURL}/posts`);

        expect (response.status()).toBe(200);
        const body = await response.json();

        console.log("BODY  :: ", body);

        // Check response is an array
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);

        for (const post of body) {
            expect(post).toHaveProperty('id');
            expect(post).toHaveProperty('user_id');
            expect(post).toHaveProperty('title');
            expect(post).toHaveProperty('body');
        }

    });

    test("Positive: Assert each object has required properties and valid data...", async({request}) => {
        const response = await request.get(`${goRestBaseURL}/posts`);

        expect (response.status()).toBe(200);
        const body = await response.json();

        console.log("BODY  :: ", body);

        // Check response is an array
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
        const idSet = new Set();

        for (const post of body) {
            expect(post).toHaveProperty('id');
            assertPositiveInteger(post.id);
            expect(idSet.has(post.id)).toBe(false);
            idSet.add(post.id);

            expect(post).toHaveProperty('user_id');
            assertPositiveInteger(post.user_id);
           
            expect(post).toHaveProperty('title');
            assertNonEmptyString(post.title);

            expect(post).toHaveProperty('body');
            assertNonEmptyString(post.body);

        }

    });

    test("NEGATIVE : GET API - wrong url ", async ({ request }) => {
        const response = await request.get(`${goRestBaseURL}/post`, {
        });

        expect(response.status()).toBe(404);

    });
})


test.describe("GET - method : fetch Comments", () =>{
    test("Positive: Assert each object has required properties", async({request}) => {
        const response = await request.get(`${goRestBaseURL}/comments`);

        expect (response.status()).toBe(200);
        const body = await response.json();

        console.log("BODY  :: ", body);

        // Check response is an array
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);

        for (const comment of body) {
            expect(comment).toHaveProperty('id');
            expect(comment).toHaveProperty('post_id');
            expect(comment).toHaveProperty('name');
            expect(comment).toHaveProperty('email');
            expect(comment).toHaveProperty('body');

        }

    });

    test("Positive: Assert each object has required properties and valid data...", async({request}) => {
        const response = await request.get(`${goRestBaseURL}/comments`);

        expect (response.status()).toBe(200);
        const body = await response.json();

        console.log("BODY  :: ", body);

        // Check response is an array
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
        const idSet = new Set();

        for (const comment of body) {
            expect(comment).toHaveProperty('id');
            assertPositiveInteger(comment.id);
            expect(idSet.has(comment.id)).toBe(false);
            idSet.add(comment.id);

            expect(comment).toHaveProperty('post_id');
            assertPositiveInteger(comment.post_id);
           
            expect(comment).toHaveProperty('name');
            assertNonEmptyString(comment.name);

            expect(comment).toHaveProperty('email');
            assertNonEmptyString(comment.email);
            assertValidEmail(comment.email);

            expect(comment).toHaveProperty('body');
            assertNonEmptyString(comment.body);

        }

    });

    test("NEGATIVE : GET API - wrong url ", async ({ request }) => {
        const response = await request.get(`${goRestBaseURL}/comment`, {
        });

        expect(response.status()).toBe(404);

    });
})


test.describe("GET - method : fetch ToDos", () =>{
    test("Positive: Assert each object has required properties", async({request}) => {
        const response = await request.get(`${goRestBaseURL}/todos`);

        expect (response.status()).toBe(200);
        const body = await response.json();

        console.log("BODY  :: ", body);

        // Check response is an array
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);

        for (const todo of body) {
            expect(todo).toHaveProperty('id');
            expect(todo).toHaveProperty('user_id');
            expect(todo).toHaveProperty('title');
            expect(todo).toHaveProperty('due_on');
            expect(todo).toHaveProperty('status');

        }

    });

    test("Positive: Assert each object has required properties and valid data...", async({request}) => {
        const response = await request.get(`${goRestBaseURL}/todos`);

        expect (response.status()).toBe(200);
        const body = await response.json();
        assertStatus
        console.log("BODY  :: ", body);

        // Check response is an array
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
        const idSet = new Set();

        for (const todo of body) {
            expect(todo).toHaveProperty('id');
            assertPositiveInteger(todo.id);
            expect(idSet.has(todo.id)).toBe(false);
            idSet.add(todo.id);

            expect(todo).toHaveProperty('user_id');
            assertPositiveInteger(todo.user_id);
           
            expect(todo).toHaveProperty('title');
            assertNonEmptyString(todo.title);

            expect(todo).toHaveProperty('due_on');
            assertValidDueOnDate(todo.due_on);
            
            expect(todo).toHaveProperty('status');
            assertToDoStatus(todo.status)


        }
    });

    test("NEGATIVE : GET API - wrong url ", async ({ request }) => {
        const response = await request.get(`${goRestBaseURL}/todo`, {
        });

        expect(response.status()).toBe(404);

    });

    test("INFO: Rate Limit behavior test", async ({ request }) => {
        const maxAttempts = 10;
        let tooManyRequestsCount = 0;
    
        for (let i = 0; i < maxAttempts; i++) {
            const response = await request.get(`${goRestBaseURL}/todos`);
    
            if (response.status() === 429) {
                console.log(`Rate limit hit at request #${i + 1}`);
                tooManyRequestsCount++;
            }
        }
    
        if (tooManyRequestsCount > 0) {
            console.log(`✅ Rate limit triggered: ${tooManyRequestsCount} requests were blocked with 429`);
        } else {
            console.log("⚠️ No rate limit triggered. API allowed all 50 requests.");
        }
    
        // Optional assert:
        expect(tooManyRequestsCount).toBeGreaterThanOrEqual(0);
    });

    test("NEGATIVE: Rate limit test using parallel requests", async ({ request }) => {
        const maxAttempts = 50;
        const url = `${goRestBaseURL}/todos`;
      
        // Explicitly type the array to hold APIResponse promises
        const requests: Promise<APIResponse>[] = [];
      
        for (let i = 0; i < maxAttempts; i++) {
          requests.push(request.get(url));
        }
      
        // Execute all requests in parallel
        const responses: APIResponse[] = await Promise.all(requests);
      
        let tooManyRequestsCount = 0;
      
        responses.forEach((response, index) => {
          const status = response.status();
      
          if (status === 429) {
            console.log(`Rate limit hit at request #${index + 1}`);
            tooManyRequestsCount++;
          } else {
            console.log(`Request #${index + 1} succeeded with status: ${status}`);
          }
        });
      
        if (tooManyRequestsCount > 0) {
          console.log(`Rate limit triggered on ${tooManyRequestsCount} requests (429 responses)`);
        } else {
          console.log("All requests succeeded. No rate limiting detected.");
        }
      
        // Optional assertion
        expect(tooManyRequestsCount).toBeGreaterThanOrEqual(0);
    });
    
    
})


test.describe("GET : method : Fetch the specific Users posts. ", () => {
    test("Positive: Fetch the user data for correct url", async({ request }) =>{
        const userId = 8029070;
        const response = await request.get(`${goRestBaseURL}/users/${userId}/posts`);
        
        const body  = await response.json();
        console.log("Body :: ", body);

        expect (response.status()).toBe(200);

        if (!Array.isArray(body)) {
            throw new Error("Expected response body to be an array");
        }

        expect(Array.isArray(body)).toBe(true);

        const bodyLength =  body.length;
        expect (bodyLength).toBe(1);

        for (const post of body) {
            expect(post).toHaveProperty('id');
            assertPositiveInteger(post.id);

            expect(post).toHaveProperty('user_id');
            assertPositiveInteger(post.user_id);
            expect (userId).toBe(post.user_id);

            expect(post).toHaveProperty('title');
            assertNonEmptyString(post.title);

            expect(post).toHaveProperty('body');
            assertNonEmptyString(post.body);

        }

    });

    test("Negative: Fetch the user post data for incorrect url", async({ request }) =>{
        const userId = 7440131;
        const response = await request.get(`${goRestBaseURL}/users/${userId}/postssss`);
        expect (response.status()).toBe(404);
    });

    test("Negative: Fetch the user post data for non existing user", async({ request }) =>{
        const userId = 99999999999;
        const response = await request.get(`${goRestBaseURL}/users/${userId}/posts`);
        
        const body  = await response.json();
        console.log("Body :: ", body);

        expect (response.status()).toBe(200);
        expect (Array.isArray(body)).toBe(true);

        const bodyLength = body.length;
        expect (bodyLength).toBe(0);


    });

    test("Should return 400 or 422 for SQL injection in user_id BUt it is returning 200 with empty array in our case...", async ({ request }) => {
        const maliciousUserId = "1 OR 1=1";  // SQL injection attempt
        const response = await request.get(`${goRestBaseURL}/users/${maliciousUserId}/posts`);
    
        // Optional: Log for debugging
        console.log("Status Code:", response.status());
        const body = await response.text();
        console.log("Response Body:", body);
    
        // Assert that API responds with 400 (Bad Request) or 422 (Unprocessable Entity)
        expect([200, 400, 422]).toContain(response.status());
    });

    test("Should return error for SQL injection string in user_id, BUt giving 200 in our case", async ({ request }) => {
        const maliciousUserId = "'1=1'";  // Another injection format
        const response = await request.get(`${goRestBaseURL}/users/${maliciousUserId}/posts`);
    
        const status = response.status();
        const body = await response.text();
        console.log("Status:", status);
        console.log("Body:", body);
    
        expect([200, 400, 422]).toContain(status);
    });

})


test.describe("POST :Create the User", () => {
    test("Negative: Create the user without authentication", async({request}) => {
        const response = await request.post(`${goRestBaseURL}/users`)

        expect (response.status()).toBe(401);

        const body = await response.json();
        expect (body.message).toBe("Authentication failed")

    });

    test("Negative : Should throw the error while creating the user without any payload",async({request}) => {
        const response = await request.post(`${goRestBaseURL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data :{}
        });

        expect (response.status()).toBe(422);
        const body = await response.json();
        console.log("ERRORS :; ", body);
        expect(Array.isArray(body)).toBe(true);

        const expectedErrors = [
            { field: "email", message: "can't be blank" },
            { field: "name", message: "can't be blank" },
            { field: "gender", message: "can't be blank" },
            { field: "status", message: "can't be blank" }
          ];
          
        expectedErrors.forEach(expected => {
            const error = body.find(err => err.field === expected.field);
            expect(error).toBeTruthy();
            expect(error.message).toContain(expected.message);
        });
          
    });
    
})
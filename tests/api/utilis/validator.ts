import {expect } from "@playwright/test";

export async function assertSuccessfulResponse(response: any, expectedPage:number,expectedPerPage:number){
    
    expect(response.status()).toBe(200);
    const data = await response.json();
  
    console.log("DATA ::: ", data);
  
    expect (data).toHaveProperty("page");
    expect (Number.isInteger(data.page)).toBe(true);
    expect ((data.page)).toBe(expectedPage);
  
  
    expect (data).toHaveProperty("per_page");
    expect (Number.isInteger(data.per_page)).toBe(true);
    expect ((data.per_page)).toBe(expectedPerPage);
  
  
    expect (data).toHaveProperty("total");
    expect (Number.isInteger(data.total)).toBe(true);
  
    expect (data).toHaveProperty("total_pages");
    expect (Number.isInteger(data.total_pages)).toBe(true);
  
    expect (data).toHaveProperty("data");
    expect (Array.isArray(data.data)).toBe(true);
    
    return data;
  
}

export async function assertUserDataResponse(user: any, index: number){
  
    try {

        expect(user).toHaveProperty("id");
        expect (Number.isInteger(user.id)).toBe(true);
        expect(user.id).toBeGreaterThan(0);
    
        expect(user).toHaveProperty("first_name");
        expect(typeof user.first_name).toBe("string");
        expect(user.first_name.trim().length).toBeGreaterThan(0);
    
        expect(user).toHaveProperty("last_name");
        expect(typeof user.last_name).toBe("string");
        expect(user.last_name.trim().length).toBeGreaterThan(0);
  
  
        // --- Email ---
        expect(user).toHaveProperty("email");
        expect(typeof user.email).toBe("string");
        expect(user.email.trim().length).toBeGreaterThan(0);
  
        // Validate email format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(emailRegex.test(user.email)).toBe(true);
  
        // --- Avatar ---
        expect(user).toHaveProperty("avatar");
        expect(typeof user.avatar).toBe("string");
        expect(user.avatar.trim().length).toBeGreaterThan(0);
  
        // Basic check if avatar is a valid URL
        const urlRegex = /^https?:\/\/[^\s$.?#].[^\s]*$/;
        expect(urlRegex.test(user.avatar)).toBe(true);
  
        // Optional: Check it ends with .jpg or .png (basic image check)
        expect(user.avatar.endsWith(".jpg") || user.avatar.endsWith(".png") || user.avatar.endsWith(".jpeg")).toBe(true);
        
        
        
      } catch (error) {
         throw new Error(
              `Validation failed at index ${index}:\n${JSON.stringify(user, null, 2)}\nError: ${error}`
            );
      }
}


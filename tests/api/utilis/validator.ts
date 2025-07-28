import {expect } from "@playwright/test";
import {
    assertPositiveInteger,
    assertNonEmptyString,
    assertValidEmail,
    assertValidUrl,
    assertImageExtension,
    assertHexColorCode,
    assertPantoneValueFormat
  } from "./fieldValidators";
  

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
        assertPositiveInteger(user.id,"id");

    
        expect(user).toHaveProperty("first_name");
        assertNonEmptyString(user.first_name,"first_name");

    
        expect(user).toHaveProperty("last_name");
        assertNonEmptyString(user.last_name,"last_name");

  
        // --- Email ---
        expect(user).toHaveProperty("email");
        assertNonEmptyString(user.email,"email");

        // Validate email format using regex
        assertValidEmail(user.email);
        
        // --- Avatar ---
        expect(user).toHaveProperty("avatar");
        assertNonEmptyString(user.avatar,"avatar");

        // Basic check if avatar is a valid URL
        assertValidUrl(user.avatar);


        // Optional: Check it ends with .jpg or .png (basic image check)
        assertImageExtension(user.avatar);        
        
      } catch (error) {
         throw new Error(
              `Validation failed at index ${index}:\n${JSON.stringify(user, null, 2)}\nError: ${error}`
            );
      }
}

export async function assertResourceDataResponse(resource:any, index:number){
    try {
        expect(resource).toHaveProperty("id");
        assertPositiveInteger(resource.id,"id");
     

        expect(resource).toHaveProperty("name");
        assertNonEmptyString(resource.name,"name");


        expect(resource).toHaveProperty("year");
        assertPositiveInteger(resource.year,"year");
      
        expect(resource).toHaveProperty("color");
        assertHexColorCode(resource.color);
        
        expect(resource).toHaveProperty("pantone_value");
         assertPantoneValueFormat(resource.pantone_value);
        

    } catch (error) {
        throw new Error(
              `Validation failed at index ${index}:\n${JSON.stringify(resource, null, 2)}\nError: ${error}`
            );
    }
}

export function assertSingleDataResponse(data: any) {
    expect(data).toHaveProperty("id");
    assertPositiveInteger(data.id,"id");

  
    expect(data).toHaveProperty("name");
    assertNonEmptyString(data.name,"name");
    

    expect(data).toHaveProperty("year");
    assertPositiveInteger(data.year,"year");
  
    expect(data).toHaveProperty("color");
    assertHexColorCode(data.color);
   
    expect(data).toHaveProperty("pantone_value");
    assertPantoneValueFormat(data.pantone_value);
}
  

export function assertSupportInfo(support: any) {
    expect(support).toHaveProperty("url");
    assertValidUrl(support.url)
  
    expect(support).toHaveProperty("text");
    assertNonEmptyString(support.text, "text");
}


export function assertSingleUserDataResponse(data: any) {
  expect(data).toHaveProperty("id");
  assertPositiveInteger(data.id,"id");


  expect(data).toHaveProperty("first_name");
  assertNonEmptyString(data.first_name,"first_name");
  
  expect(data).toHaveProperty("last_name");
  assertNonEmptyString(data.last_name,"last_name");
  

   // --- Email ---
   expect(data).toHaveProperty("email");
   assertNonEmptyString(data.email,"email");

   // Validate email format using regex
   assertValidEmail(data.email);
   
   // --- Avatar ---
   expect(data).toHaveProperty("avatar");
   assertNonEmptyString(data.avatar,"avatar");

   // Basic check if avatar is a valid URL
   assertValidUrl(data.avatar);

}

  

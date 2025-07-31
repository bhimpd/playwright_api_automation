import { expect } from "@playwright/test";

export async function assertPositiveInteger(value:any){
    const intVal = Number(value);
    expect(Number.isInteger(intVal)).toBe(true);
    expect(intVal).toBeGreaterThan(0);
}

export async function assertNonEmptyString(value:any){
    expect (typeof value).toBe("string");
    expect (value.trim().length).toBeGreaterThan(0);
}

export async function assertNonEmptyArray(value:any){
    expect(Array.isArray(value)).toBe(true);
    expect (value.length).toBeGreaterThan(0);
}

export async function assertValidEmail(email:any){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect (emailRegex.test(email)).toBe(true);
}


export async function assertGender(value: any) {
    const expectedGender = ["male", "female"];
    expect(expectedGender.includes(value)).toBe(true);
}

export async function assertStatus(value: any) {
    const expectedStatus = ["active", "inactive"];
    expect(expectedStatus.includes(value)).toBe(true);
}
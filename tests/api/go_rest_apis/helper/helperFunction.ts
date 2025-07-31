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
    expect (typeof email).toBe("string");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect (emailRegex.test(email)).toBe(true);
}


export async function assertGender(value: any) {
    expect (typeof value).toBe("string");
    const expectedGender = ["male", "female"];
    expect(expectedGender.includes(value)).toBe(true);
}

export async function assertStatus(value: any) {
    expect (typeof value).toBe("string");
    const expectedStatus = ["active", "inactive"];
    expect(expectedStatus.includes(value)).toBe(true);
}


export async function assertToDoStatus(value: any) {
    expect (typeof value).toBe("string");
    const expectedStatus = ["pending", "completed"];
    expect(expectedStatus.includes(value)).toBe(true);
}

export async function assertValidDueOnDate(value: any) {
    expect(typeof value).toBe("string");
    expect(value.trim().length).toBeGreaterThan(0);

    // Assert ISO 8601 format
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/;
    expect(isoRegex.test(value)).toBe(true);

    // Assert it's a valid date
    const date = new Date(value);
    expect(date.toString()).not.toBe("Invalid Date");

    // Assert it's a future date
    // expect(date.getTime()).toBeGreaterThan(Date.now());
}


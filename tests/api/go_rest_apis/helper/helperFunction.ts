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
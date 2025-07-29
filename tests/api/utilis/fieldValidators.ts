import { expect } from "@playwright/test";


export function assertPositiveInteger(value: any, fieldName: string) {
  const intVal = Number(value);
  expect(Number.isInteger(intVal)).toBe(true);
  expect(intVal).toBeGreaterThan(0);
}


export function assertNonEmptyString(value: any, fieldName: string) {
  expect(typeof value).toBe("string");
  expect(value.trim().length).toBeGreaterThan(0);
}

export function assertValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  expect(emailRegex.test(email)).toBe(true);
}

export function assertValidUrl(url: string) {
  const urlRegex = /^https?:\/\/[^\s$.?#].[^\s]*$/;
  expect(urlRegex.test(url)).toBe(true);
}

export function assertImageExtension(url: string) {
  expect(url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg")).toBe(true);
}

export function assertHexColorCode(color: string) {
  const colorRegex = /^#[0-9A-Fa-f]{6}$/;
  expect(colorRegex.test(color)).toBe(true);
}

export function assertPantoneValueFormat(value: string) {
  const pantoneRegex = /^[0-9]{2}-[0-9]{4}$/;
  expect(pantoneRegex.test(value)).toBe(true);
}


export function assertValidIsoDate(dateStr: string, fieldName: string) {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  expect(isoDateRegex.test(dateStr)).toBeTruthy();
  console.log(`✅ ${fieldName} is a valid ISO date`);
}

export function assertDateIsRecent(dateStr: string, fieldName: string) {
  const receivedTime = new Date(dateStr).getTime();
  const currentTime = new Date().getTime();
  const diffInSeconds = Math.abs((currentTime - receivedTime) / 1000);

  // Allow up to 10 seconds difference
  expect(diffInSeconds).toBeLessThan(10);
  console.log(`✅ ${fieldName} is recent (${diffInSeconds.toFixed(2)}s ago)`);
}

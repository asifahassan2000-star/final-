/**
 * Input sanitization utility for public client forms
 * Strips HTML tags, script vectors, and malicious event handlers to prevent XSS.
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '') // Strip angle brackets
    .replace(/javascript:/gi, '') // Strip javascript pseudo-protocol
    .replace(/on\w+=/gi, '') // Strip inline event handlers like onload=, onerror=
    .trim();
}

export function sanitizeEmail(email: string): string {
  return sanitizeInput(email).toLowerCase();
}

export function sanitizePhone(phone: string): string {
  // Retain digits, hyphens, plus, and spaces only
  return phone.replace(/[^\d+-\s]/g, '').trim();
}

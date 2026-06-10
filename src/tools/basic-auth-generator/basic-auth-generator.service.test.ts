import { describe, expect, it } from 'vitest';
import { generateBasicAuthHeader, getBasicAuthValue } from './basic-auth-generator.service';

describe('basic-auth-generator service', () => {
  describe('getBasicAuthValue', () => {
    it('should generate basic auth value correctly for standard credentials', () => {
      expect(getBasicAuthValue('admin', 'password123')).toBe('Basic YWRtaW46cGFzc3dvcmQxMjM=');
    });

    it('should handle empty password', () => {
      expect(getBasicAuthValue('token_only', '')).toBe('Basic dG9rZW5fb25seTo=');
      expect(getBasicAuthValue('token_only')).toBe('Basic dG9rZW5fb25seTo=');
    });

    it('should handle special characters', () => {
      expect(getBasicAuthValue('user@example.com', 'p@$$w0rd!')).toBe('Basic dXNlckBleGFtcGxlLmNvbTpwQCQkdzByZCE=');
    });

    it('should handle UTF-8 characters correctly', () => {
      // user:päßwörd
      // base64('user:päßwörd') -> dXNlcjpww6TDn3fDtnJk
      expect(getBasicAuthValue('user', 'päßwörd')).toBe('Basic dXNlcjpww6TDn3fDtnJk');
    });
  });

  describe('generateBasicAuthHeader', () => {
    it('should prepend Authorization: correctly', () => {
      expect(generateBasicAuthHeader('admin', 'password123')).toBe('Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=');
    });
  });
});

import { textToBase64 } from '@/utils/base64';

export function getBasicAuthValue(username: string, password?: string) {
  const credentials = `${username}:${password ?? ''}`;
  return `Basic ${textToBase64(credentials)}`;
}

export function generateBasicAuthHeader(username: string, password?: string) {
  return `Authorization: ${getBasicAuthValue(username, password)}`;
}

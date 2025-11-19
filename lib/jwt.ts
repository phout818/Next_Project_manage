export function decodeJWT(token: string) {
  try {
    const payload = token.split(".")[1];
    const decode = JSON.parse(atob(payload));
    return decode;
  } catch (e) {
    return null;
  }
}

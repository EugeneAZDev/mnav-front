import getApiMethods from '.';

let cached = null;

export async function fetchApiMethods() {
  if (cached) {
    return cached;
  }
  const methods = await getApiMethods();
  cached = methods;
  return methods;
}

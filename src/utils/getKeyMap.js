function getKeyByValue(targetValue, listMap) {
  for (const [key, value] of listMap) {
    if (value === targetValue) {
      return key;
    }
  }
  return undefined;
}

export default getKeyByValue;

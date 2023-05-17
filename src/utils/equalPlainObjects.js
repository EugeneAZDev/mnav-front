const equalPlainObjects = (source, target) => {
  const sourceKeys = Object.keys(source);
  const targetKeys = Object.keys(target);

  if (sourceKeys.length !== targetKeys.length) {
    return false;
  }

  return sourceKeys.every(key => {
    if (!target.hasOwnProperty(key)) {
      return false;
    }

    return source[key] === target[key];
  });
}

export default equalPlainObjects

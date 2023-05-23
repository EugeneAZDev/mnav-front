const validNumberValue = (target) =>
  ((typeof target === 'string' || typeof target === 'number') &&
    !isNaN(Number(target)) ?
    Number(target) :
    undefined);

export default validNumberValue;

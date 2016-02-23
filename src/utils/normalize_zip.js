const normalizeZip = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (onlyNums.length <= 5) {
    return onlyNums;
  }
  return onlyNums.slice(0, 5);
};

export default normalizeZip;

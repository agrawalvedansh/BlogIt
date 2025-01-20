const stringTruncator = string => {
  if (string.length <= 30) {
    return string;
  }

  return `${string.slice(0, 30)}...`;
};

export default stringTruncator;

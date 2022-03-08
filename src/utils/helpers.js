//currency coverter function
export const formatPrice = (num) => {
  const newNumber = Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(num / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  // lets return only the unique values,remember there are several examples of each data type  so return only one example from each data type
  // if the type == array of arrays then we want just to flatend that to simply just one array
  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};

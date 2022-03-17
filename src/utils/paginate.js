import _ from "lodash";

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};

export const getPageCount = (itemsCount, pageSize) => {
  return Math.ceil(itemsCount / pageSize);
};

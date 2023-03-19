export const checkTimePassed = (item: string) => {
  const checkItem = localStorage.getItem(item);

  if (checkItem) {
    const today = new Date().getTime();
    const itemDate = new Date(checkItem).getTime();
    const result = (today - itemDate) / (24 * 3600 * 1000);

    if (result > 1) {
      return true;
    } else {
      return false;
    }
  }
  return true;
};

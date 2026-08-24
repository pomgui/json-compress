export const fmt = (num: number, dig = 0) =>
  num.toLocaleString('en-us', {
    minimumFractionDigits: dig,
    maximumFractionDigits: dig,
  });

export const timeOf = (f: Function) => {
  const start = performance.now();
  const json = f();
  const end = performance.now();
  return { json, time: end - start };
};

export const readUrl = async (url: string) => {
  const response = await fetch(url);
  const text = await response.text();
  return { json: JSON.parse(text), text };
};

module.exports = { readUrl };

async function readUrl(url) {
  const response = await fetch(url);
  const text = await response.text();
  return { json: JSON.parse(text), text };
}

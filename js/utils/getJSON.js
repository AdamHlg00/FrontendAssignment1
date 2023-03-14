// Fetches a JSON file
export async function getJSON(url) {
  let data = await (await fetch(url)).json()
  return data
}
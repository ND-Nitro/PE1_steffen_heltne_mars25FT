const BASE_URL = "https://v2.api.noroff.dev";

export async function getPosts(profileName, limit = 12) {
  const url = `${BASE_URL}/blog/posts/${profileName}?limit=${limit}`;

  const response = await fetch(url);
  const result = await response.json();

  return result.data;
}

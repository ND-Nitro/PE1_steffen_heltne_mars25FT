const postEl = document.getElementById("post");
const shareBtn = document.getElementById("share");
const shareStatus = document.getElementById("shareStatus");

const profileName = "Nd-nitro";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  postEl.innerHTML = `<p class="status status--error">Mangler id i URL.</p>`;
} else {
  loadPost(id);
}

async function loadPost(postId) {
  try {
    postEl.innerHTML = `<p class="status">Laster post...</p>`;

    const url = `https://v2.api.noroff.dev/blog/posts/${profileName}/${postId}`;
    const res = await fetch(url);
    const json = await res.json();

    const post = json.data;

    const date = post.created
      ? new Date(post.created).toLocaleDateString("no-NO")
      : "";

    postEl.innerHTML = `
      <h2 class="post__title">${post.title}</h2>
      <p class="post__meta">Publisert: ${date}</p>

      ${
        post.media?.url
          ? `
        <img class="post__img" src="${post.media.url}" alt="${post.media.alt || post.title}">
      `
          : ""
      }

      <div class="post__body">${(post.body || "").replaceAll("\n", "<br>")}</div>
    `;
  } catch (error) {
    postEl.innerHTML = `<p class="status status--error">Feil: ${error.message}</p>`;
    console.error(error);
  }
}

shareBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    shareStatus.textContent = "Link kopiert ✅";
  } catch {
    // fallback
    const url = window.location.href;
    window.prompt("Kopier linken:", url);
  }
});

import { getPosts } from "./api.js";

const postsEl = document.getElementById("posts");
const profileName = "Nd-nitro";

function postCardTemplate(post) {
  const excerpt = (post.body || "").slice(0, 120);
  const hasMedia = post.media?.url;

  return `
    <article class="post-card">
      <a class="post-card__link" href="./post/index.html?id=${post.id}">
        ${
          hasMedia
            ? `<img class="post-card__img" src="${post.media.url}" alt="${post.media.alt || post.title}">`
            : ""
        }
        <div class="post-card__content">
          <h3 class="post-card__title">${post.title}</h3>
          <p class="post-card__excerpt">${excerpt}${
            post.body && post.body.length > 120 ? "..." : ""
          }</p>
          <span class="post-card__readmore">Les mer →</span>
        </div>
      </a>
    </article>
  `;
}

async function showPosts() {
  try {
    if (!postsEl) {
      throw new Error('Fant ikke elementet med id="posts" i HTML.');
    }

    postsEl.innerHTML = `<p class="status">Laster innlegg...</p>`;

    // ✅ ENDRET: hent respons, og plukk ut array uansett format
    const res = await getPosts(profileName);
    const posts = Array.isArray(res) ? res : (res?.data ?? []);

    postsEl.innerHTML = posts.map(postCardTemplate).join("");

    // Valgfritt: hvis API returnerte tomt
    if (posts.length === 0) {
      postsEl.innerHTML = `<p class="status">Ingen innlegg å vise.</p>`;
    }
  } catch (error) {
    if (postsEl) {
      postsEl.innerHTML = `<p class="status status--error">Feil: ${error.message}</p>`;
    }
    console.error(error);
  }
}

showPosts();

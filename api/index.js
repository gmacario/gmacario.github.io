// api/index.js
import matter from "gray-matter";
const marked = require("marked");
import yaml from "js-yaml";

// Local function to format date strings
function formatDate(date) {
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  return `${ye}-${mo}-${da}`;
}

// Returns an array of objects.
// Every element is a post
export async function getAllPosts() {
  // Pass a directory to search, don't look into subdirectories, find files matching the regex
  const context = require.context("../_posts", false, /\.md$/);
  const posts = [];

  for (const key of context.keys()) {
    // Key looks something like ./filename.md
    const post = key.slice(2);
    // Import the entire content of the post
    const content = await import(`../_posts/${post}`);
    // Parse the document using gray-matter
    const meta = matter(content.default);
    // meta.data contains the metadata
    // meta.content contains the document body

    // Format the date field
    let localDate;
    if ("date" in meta.data) {
      if (meta.data.date instanceof Date) {
        localDate = formatDate(meta.data.date);
      }
      if (typeof meta.data.date === "string") {
        localDate = formatDate(new Date(meta.data.date.split(" ")[0]));
      }
    } else {
      localDate = null;
    }

    // Add the post to the post array
    posts.unshift({
      // Use the post name as link (with no extension)
      slug: post.replace(".md", ""),
      title: meta.data.title,
      excerpt: "excerpt" in meta.data ? meta.data.excerpt : null,
      date: localDate,
    });
  }
  const postsOrdered = posts;
  // Currently posts are ordered by name -> chronologically
  // Uncomment the command below to sort by the date property
  // const posts_ordered = posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return postsOrdered;
}

// Returns a single post object based on its slug.
// Its content property contains HTM from the parsed markdown
export async function getPostBySlug(slug) {
  // Import the entire content of the post
  const fileContent = await import(`../_posts/${slug}.md`);
  // Parse the document using gray-matter
  const meta = matter(fileContent.default);
  // meta.data contains the metadata
  // meta.content contains the document body

  // The markdown content is parsed and converted by 'marked'
  const content = marked.parse(meta.content);
  return {
    title: meta.data.title,
    content: content,
  };
}

// Export the config properties to make them available to other components
export async function getConfig() {
  // Read the content of the config file
  const config = await import("../config.yml");
  // Returned the parsed file object
  return yaml.safeLoad(config.default);
}

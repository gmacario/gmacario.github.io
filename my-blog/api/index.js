// api/index.js
import matter from 'gray-matter';

// Returns an array of objects.
// Every element is a post
export async function getAllPosts() {
    // Pass a directory to search, don't look into subdirectories, find files matching the regex
    const context = require.context('../_posts', false, /\.md$/);
    const posts = [];

    for (const key of context.keys()){
        // Key looks something like ./filename.md
        const post = key.slice(2);
        // Import the entire content of the post
        const content = await import(`../_posts/${post}`)
        // Parse the document using gray-matter
        const meta = matter(content.default);
        // meta.data contains the metadata
        // meta.content contains the document body
        
        // Add the post to the post array
        posts.push({
            // Use the post name as link (with no extension)
            slug: post.replace('.md',''),
            title: meta.data.title
        })
    }
    return posts;
}

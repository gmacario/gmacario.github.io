// api/index.js
import matter from 'gray-matter';
import marked from 'marked';
import yaml from 'js-yaml';

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
            title: meta.data.title,
            excerpt: ( ('excerpt' in meta.data) ? meta.data.excerpt : null),
            date: ( ('date' in meta.data) ? meta.data.date.toString() : null)
        })
    }
    return posts;
}

// Returns a single post object based on its slug.
// Its content property contains HTM from the parsed markdown
export async function getPostBySlug(slug) {
    // Import the entire content of the post
    const fileContent = await import(`../_posts/${slug}.md`)
    // Parse the document using gray-matter
    const meta = matter(fileContent.default);
    // meta.data contains the metadata
    // meta.content contains the document body
    
    // The markdown content is pared and converted by 'marked'
    const content = marked(meta.content);
    return {
        title: meta.data.title,
        content: content
    }
}

// Export the config properties to make them available to other components
export async function getConfig() {
    // Read the content of the config file
    const config = await import('../config.yml');
    // Returned the parsed file object
    return yaml.safeLoad(config.default);
}
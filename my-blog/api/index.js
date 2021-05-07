// api/index.js
import matter from 'gray-matter';

export async function getAllPosts() {
    // Pass a directory to search, don't look into subdirectories, find files matching the regex
    const context = require.context('../_posts', false, /\.md$/);
    const
}

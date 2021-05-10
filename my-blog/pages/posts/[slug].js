// pages/posts/[slug].js
import { getAllPosts, getPostBySlug } from '@api';
import PostLayout from '@layouts/post';
import { getConfig } from '../../api';

export default function Post(props) {
    return (
        <PostLayout title={props.post.title} content={props.post.content} social={props.config.social}/>
    )
}

// Build the props object to pass to the default component
export async function getStaticProps(context) {
    const readConf = await getConfig();
    const readPost = await getPostBySlug(context.params.slug);
    return {
        props: {
            post: readPost,
            config: readConf
        }
    }
}

// The getStaticProps has to know the requested page slug
// At build time this supplies the list of all possible paths
export async function getStaticPaths() {
    let paths = await getAllPosts()

    paths = paths.map(
        post => ({
            params: {slug: post.slug}
        })
    );

    return {
        paths: paths,
        // Return page 404 for pages that don't exist
        fallback: false
    }
}
// pages/posts/[slug].js
import { getAllPosts, getPostBySlug } from '@api';
import PostLayout from '@layouts/post';
import { useContext } from 'react';

export default function Post(props) {
    console.log(props)
    return (
        <PostLayout title={props.title} content={props.content}/>
    )
}

// Build the props object to pass to the default component
export async function getStaticProps(context) {
    return {
        props: await getPostBySlug(context.params.slug)
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
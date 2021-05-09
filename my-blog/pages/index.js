// pages/index.js

import DefaultLayout from '@layouts/default';
import Link from 'next/link';
import {getAllPosts, getConfig, getPostBySlug} from '@api'

export default function Blog(props) {
    return (
        // Use the DefaultLayout for the homepage
        // Execute the function below for each postof the posts array 
        <DefaultLayout title={props.title} description={props.description}>
            <p>Posts:</p>
            <ul>
                {props.posts.map(
                    function(post, idx) {
                        return(
                            <li key={idx}>
                                <Link href={'/posts/'+post.slug}>
                                    <a>{post.title}</a>
                                </Link>
                            </li>
                        )
                    }
                )}
            </ul>
        </DefaultLayout>
    )
}

// This is called at build time and passes props to the default component (Blog)
export async function getStaticProps() {
    const allPosts = await getAllPosts();
    const config = await getConfig();
    
    return {
        props: {
            posts: allPosts,
            title: config.title,
            description: config.description
        }
    }
}
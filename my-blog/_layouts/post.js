// _layout/posts.js
import DefaultLayout from '@layouts/default'
import Head from 'next/head';
import Link from 'next/link';

// Create the post layout
// This will override the default layout on post pages
export default function PostLayout(props) {
    return (
        <DefaultLayout>
            <Head>
                <title>{props.title}</title>
            </Head>
            <article>
                <h1>{props.title}</h1>
                <div className="prose prose-indigo hover:prose-black md:prose-lg lg:prose-xl" dangerouslySetInnerHTML={{__html:props.content}}/>
            </article>
        </DefaultLayout>
    )
}         
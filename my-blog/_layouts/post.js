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
                <div dangerouslySetInnerHTML={{__html:props.content}}/>
                <div><Link href='/'><a>Home</a></Link></div>
            </article>
        </DefaultLayout>
    )
}
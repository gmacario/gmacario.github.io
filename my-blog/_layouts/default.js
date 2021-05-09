// _layout/default.js
import Head from 'next/head';
import Header from '@includes/header';
import Footer from '@includes/footer';

// Create the default layout
export default function DefaultLayout(props) {
    return (
        <main className="h-screen"> 
            <Head>
                <title>{props.title}</title>
                <meta name='description' content={props.description}/>
            </Head>
            <Header></Header>
            <div className="pt-28 mx-auto w-9/12 break-all prose prose-indigo hover:prose-black md:prose-lg lg:prose-xl">
                {props.children}
            </div>
            <Footer title={props.title} description={props.description} social={props.social}/>
        </main>
    )
}
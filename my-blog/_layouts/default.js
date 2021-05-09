// _layout/default.js
import Head from 'next/head';
import Header from '@includes/header';
import Footer from '@includes/footer';

// Create the default layout
export default function DefaultLayout(props) {
    return (
        <main>
            <Head>
                <title>{props.title}</title>
                <meta name='description' content={props.description}/>
            </Head>
            <Header></Header>
            {props.children}
            <Footer/>
        </main>
    )
}
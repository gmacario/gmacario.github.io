// pages/index.js

import DefaultLayout from '@layouts/default';
import Link from 'next/link';
import {getAllPosts, getConfig, getPostBySlug} from '@api'

export default function Blog(props) {
    return (
        // Use the DefaultLayout for the homepage
        // Execute the function below for each post of the posts array 
        <DefaultLayout title={props.title} description={props.description} social={props.social}> 
            <div className="prose">
                <h1>About me:</h1>
                <h2>Who am I?</h2>
                <ul>
                    <li>
                        <Link href="../bio/CV-Europass-20210504-Macario-EN.pdf">
                            <a>
                                Gianpaolo Macario - Curriculum Vitae
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="http://it.linkedin.com/in/gmacario/">
                            <a>
                                My profile on LinkedIn
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="http://www.openhub.net/accounts/gmacario">
                            <a>
                                My profile on Open Hub
                            </a>
                        </Link>
                    </li>
                </ul>
                <h2>Some projects I have been working on</h2>
                <ul>
                    <li>
                        <Link href="https://github.com/gmacario/easy-build">
                            <a>
                                easy-build
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/gmacario/easy-jenkins">
                            <a>
                                easy-jenkins
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/gmacario/lxcbench/">
                            <a>
                                GENIVI LXCBENCH
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/gmacario/gm-admintools/">
                            <a>
                                gm-admintools
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/gmacario/vagrant-atlassian">
                            <a>
                                vagrant-atlassian
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/gmacario/vagrant-ubuntu1404">
                            <a>
                                vagrant-ubuntu1404
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
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
            description: config.description,
            social: config.social
        }
    }
}
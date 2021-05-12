// posts/index.js
import DefaultLayout from '@layouts/default'
import Link from 'next/link'
import { Fragment } from 'react'
import { getAllPosts, getConfig } from '@api'

export default function Posts (props) {
  return (
  // Use the DefaultLayout for the posts page
  // Execute the function below for each post of the posts array
    <DefaultLayout title={props.title} description={props.description} social={props.social}>
      <div className='prose'>
        <h1>Posts:</h1>
        {props.posts.map(
          function (post, idx) {
            return (
              <Fragment key={idx}>
                <h2>
                  <Link href={'/posts/' + post.slug}>
                    <a>{post.title}</a>
                  </Link>
                </h2>
                <p className='prose-sm text-gray-500'>{post.date}</p>
                <p>{post.excerpt}</p>
              </Fragment>
            )
          }
        )}
      </div>
    </DefaultLayout>
  )
}

// This is called at build time and passes props to the default component (Blog)
export async function getStaticProps () {
  const allPosts = await getAllPosts()
  const config = await getConfig()

  return {
    props: {
      posts: allPosts,
      title: config.title,
      description: config.description,
      social: config.social
    }
  }
}

// _includes/footer.js
import Link from 'next/link'
import GithubIcon from '@material-ui/icons/GitHub'
import TwitterIcon from '@material-ui/icons/Twitter'

export default function Footer (props) {
  return (
  /* outer box, gray with horizontal line */
    <footer className='h-auto mt-20 bg-gray-100 justify-between border-t border-gray-200'>
      {/* Column; Blog title on top, then contact info */}
      <div className='pt-6 mx-auto  gap-x-6 w-9/12 flex flex-col prose prose-indigo hover:prose-black md:prose-lg lg:prose-xl'>
        <div className='prose-xl'>
          <p className=''>
            {props.title}
          </p>
        </div>
        {/* Col; contact info - over a certain screen size, becomes a column */}
        <div className='flex flex-col sm:flex-row flex-wrap justify-between md:justify-start'>
          <p className='mr-12 text-gray-600 prose-sm'>
            {props.title}
          </p>
          <div className='mr-12 flex flex-col justify-start'>
            <p className='text-gray-600 prose-sm flex flex-row'>
              <GithubIcon className='mr-2' />
              <Link href={props.social.github.link}>
                <a>{props.social.github.name}</a>
              </Link>
            </p>
            <p className='text-gray-600 prose-sm flex flex-row'>
              <TwitterIcon className='mr-2' />
              <Link href={props.social.twitter.link}>
                <a>{props.social.twitter.name}</a>
              </Link>
            </p>
          </div>
          <p className='mr-12 text-gray-600 prose-sm'>
            {props.description}
          </p>
        </div>
      </div>
    </footer>
  )
}

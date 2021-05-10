// _includes/footer.js
import Link from 'next/link';
import GithubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function Footer(props) {
    return (
        <footer className="h-60 mt-20 bg-gray-100 justify-between border-t border-gray-200">
            <div className="pt-6 mx-auto w-9/12 flex flex-col break-all prose prose-indigo hover:prose-black md:prose-lg lg:prose-xl">
                <div className="mx-6 prose-xl">
                    <p className="">
                        {props.title}
                    </p>
                </div>
                <div className="mx-6 flex flex-row justify-between">
                    <p className="text-gray-600 prose-sm">
                        {props.title}
                    </p>
                    <div className="ml-3 flex flex-col justify-start">
                        <p className="text-gray-600 prose-sm flex flex-row">
                                        <GithubIcon className="mr-2"/>
                                        <Link href={props.social.github.link}>
                                            <a>{props.social.github.name}</a>
                                        </Link>
                        </p>
                        <p className="text-gray-600 prose-sm flex flex-row">
                                        <TwitterIcon className="mr-2"/>
                                        <Link href={props.social.twitter.link}>
                                            <a>{props.social.twitter.name}</a>
                                        </Link>
                        </p>
                    </div>
                    <p className="text-gray-600 prose-sm">
                        {props.description}
                    </p>
                </div>
            </div>
        </footer>
    )
}
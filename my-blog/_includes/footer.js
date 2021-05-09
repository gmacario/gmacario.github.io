// _includes/footer.js
import { getConfig } from "@api";
import Link from "next/link";

export default function Footer(props) {
    console.log(props)
    return (
        <footer className="h-40 bg-gray-100 justify-between border-t border-gray-200">
            <div className="pt-6 mx-auto w-9/12 break-all prose prose-indigo hover:prose-black md:prose-lg lg:prose-xl">
            <div className="mx-6 inline-block">
                    <p className="">
                        {props.title}
                    </p>
                    <p className="text-gray-600 prose-sm">
                        {props.description}
                    </p>
                </div>
                <div className="mx-6 inline-block">
                    {props.social.map(
                        (s) => {
                            return(
                                <p className="text-gray-600 prose-sm">
                                    <Link href={s.link}>
                                        <a>{s.name}</a>
                                    </Link>
                                </p>
                            )
                        }
                    )}
                </div>
            </div>
        </footer>
    )
}
// pages/posts/[slug].js
import { useRouter } from 'next/router'

export default function Slug() {
    const router = useRouter();
    // Matches the dynamic route [slug]
    const { slugs } = router.query;

    return (<div>Requested:  { slugs }</div>)
}

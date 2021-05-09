// pages/index.js

import {getAllPosts} from 'api/index'

export default function Blog() {
    getAllPosts();
    return (
        <div>Hello world!</div>
    )
}
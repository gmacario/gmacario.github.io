// pages/index.js

import {getAllPosts, getPostBySlug} from '@api'

export default function Blog() {
    // Testing api functions
    const posts = getAllPosts()
    .then( (res) => {
            for(const p in res){
                console.log(res[p])
                console.log(getPostBySlug(res[p].slug))
            }
        }
    );


    
    return (
        <div>Hello world!</div>
    )
}
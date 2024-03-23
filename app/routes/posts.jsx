import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "../models/post.server"

export async function loader() {
    const posts = await getPosts();
    return posts.result;
}

export default function Posts() {
    const posts = useLoaderData();
    console.log({ posts });
    return (
        <main className="text-gray-300">
            <h1 className="mt-20 ">Posts</h1>
            <ul>
                {posts.map(post => (
                    <Link key={post._id} to={post.slug.current}>
                        <li>{post.title}</li>
                    </Link>
                ))}
            </ul>
        </main>
    )
}
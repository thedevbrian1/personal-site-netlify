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
        <main className="text-gray-300 mt-20 py-16 px-6 xl:px-0 lg:max-w-2xl mx-auto">
            <h1 className="font-bold text-4xl">Articles</h1>
            <ul className="mt-8">
                {posts.map(post => (
                    <PostCard
                        key={post._id}
                        href={post.slug.current}
                        title={post.title}
                        description={post.description}
                        imgSrc={post.mainImage.asset.url}
                        createdAt={post._createdAt}
                    />
                ))}
            </ul>
        </main>
    );
}

function PostCard({ href, title, description, imgSrc, createdAt }) {
    return (
        <Link
            to={href}
            prefetch="intent"
            className="grid md:grid-cols-3 bg-brand-alt-blue rounded-lg hover:outline hover:outline-1  hover:outline-[#feb465] transition ease-in-out duration-300"
        >
            <img src={imgSrc} alt="" className="w-full h-52 object-cover md:col-span-1 p-4 rounded-lg" />
            <div className="md:col-span-2 p-6">
                <h2 className="font-semibold text-lg lg:text-xl">{title}</h2>
                <p><time dateTime={createdAt}>
                    {new Intl.DateTimeFormat('en-GB', {
                        dateStyle: 'full',
                        // timeStyle: 'long',
                        timeZone: 'Australia/Sydney'
                    }).format(new Date(createdAt))
                    }
                </time>
                </p>
                <p className="mt-4 text-gray-400">{description}</p>
            </div>
        </Link>
    );
}
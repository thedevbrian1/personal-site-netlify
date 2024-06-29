import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { getPosts } from "../models/post.server"
import { ArrowLeftIcon, ErrorIcon } from "../components/Icon";

export async function loader() {
    const posts = await getPosts();
    return posts;
}

export default function Posts() {
    const posts = useLoaderData();
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
                        imgSrc={post.mainImage?.asset.url}
                        createdAt={post.formattedCreatedAt}
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
                <p className="mt-2"><time dateTime={new Date(createdAt)}>
                    {createdAt}
                </time>
                </p>
                <p className="mt-4 text-gray-400">{description}</p>
            </div>
        </Link>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        console.log({ error });
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='flex flex-col items-center gap-4 text-gray-300'>
                    <div className='w-40'>
                        <ErrorIcon />
                    </div>
                    <h1 className='font-semibold text-3xl text-red-500'>{error.status} {error.statusText}</h1>
                    <Link to="/" className='px-4 py-2 rounded flex gap-1 text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'><ArrowLeftIcon /> Go to home</Link>
                </div>
            </div>
        );
    } else if (error instanceof Error) {
        console.log({ error });
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='flex flex-col items-center gap-4 px-6 xl:px-0'>
                    <div className='w-40'>
                        <ErrorIcon />
                    </div>
                    <h1 className='text-red-500 text-3xl'>Error fetching posts</h1>
                    <Link to="/" className='px-4 py-2 rounded flex gap-1 text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'><ArrowLeftIcon /> Go to home</Link>
                </div>
            </div>
        );
    }
}
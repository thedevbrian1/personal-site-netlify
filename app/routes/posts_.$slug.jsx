import { PortableText } from '@portabletext/react';
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';
import { getPost } from '../models/post.server';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon, CheckIcon, ClipboardIcon, ErrorIcon } from '../components/Icon';

export async function loader({ params }) {
    const post = await getPost(params.slug);
    return post.result;
}

const components = {
    types: {
        code: Code
    }
}

function Code({ value }) {
    const [isCopied, setIsCopied] = useState(false);

    function copyToClipboard() {
        navigator.clipboard.writeText(value.code)
            .then(() => setIsCopied(true))
            .catch((error) => { console.log({ error }) });
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            copyToClipboard();
        }
    }

    useEffect(() => {
        let timeoutId;
        if (isCopied) {
            timeoutId = setTimeout(() => setIsCopied(false), 3000);
        }
        return () => clearTimeout(timeoutId);
    }, [isCopied]);

    // TODO: Use code syntax highlighting
    return (
        <div className='relative' tabIndex='0' onKeyDown={handleKeyDown}>
            {isCopied
                ? (<span
                    className='absolute top-2 right-4 flex gap-1 items-center text-green-500 transition ease-in-out duration-300'
                    title='Copied'
                    aria-label='Copied'
                    onClick={() => setIsCopied(false)}
                >
                    Copied <CheckIcon />
                </span>)
                : (
                    <span
                        className='absolute top-4 right-4 transition ease-in-out duration-300'
                        title='Copy to clipboard'
                        aria-label='Copy to clipboard'
                        onClick={() => copyToClipboard()}
                    >
                        <ClipboardIcon />
                    </span>
                )
            }


            <pre className='p-4'><code>{value.code}</code></pre>

        </div>
    );
}

export default function Post() {
    const post = useLoaderData();
    console.log({ post });

    return (
        <main className='mt-20 py-16 px-6  max-w-3xl 2xl:max-w-3xl mx-auto text-gray-300 prose prose-code:text-gray-300'>
            <article>
                <div className='px-2 md:px-6'>
                    <h1 className='text-gray-300'>{post[0].title}</h1>
                    <p><time dateTime={post[0]._createdAt}>{new Date(post[0]._createdAt).toLocaleDateString()}
                    </time> -- 3 min read
                    </p>

                </div>
                <img src={post[0].mainImage.asset.url} alt="" className='aspect-video w-full object-cover' />
                <div className='px-2 md:px-6'>
                    <PortableText value={post[0].body} components={components} />
                </div>
            </article>
        </main>
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
                    <h1 className='font-semibold text-3xl'>{error.status} {error.statusText}</h1>
                    <p>{error.data}</p>
                    <Link to="/posts" className='px-4 py-2 rounded flex gap-1 text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'><ArrowLeftIcon /> Back to articles</Link>
                </div>
            </div>
        );
    } else if (error instanceof Error) {
        console.log({ error });
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='w-40'>
                        <ErrorIcon />
                    </div>
                    <h1 className='text-gray-300'>{error.message}</h1>
                    <Link to="/posts" className='px-4 py-2 rounded flex gap-1 text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'><ArrowLeftIcon /> Back to articles</Link>
                </div>
            </div>
        );
    }
}
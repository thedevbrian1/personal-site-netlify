import { json } from '@remix-run/node';
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { getPost } from '../models/post.server';
import { ArrowLeftIcon, CheckIcon, ClipboardIcon, ErrorIcon } from '../components/Icon';
import ReactPlayer from "react-player/youtube";
import Lowlight from "react-lowlight";
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/night-owl.css';

import { urlFor } from '~/utils';

Lowlight.registerLanguage('js', javascript);

export function headers({ loaderHeaders }) {
    return { 'Cache-Control': loaderHeaders.get('Cache-Control') };
}

export function meta({ data }) {
    return [
        { title: data[0].title },
        {
            name: 'description',
            content: data[0].description
        }
    ]
}
export async function loader({ params }) {
    const post = await getPost(params.slug);
    return json(post);
}

const components = {
    types: {
        image: ({ value }) => (
            <img
                src={`${urlFor(value.asset)}`}
                alt=""
                className="revealing-image max-w-xs lg:max-w-sm mx-auto aspect-[4/3] object-contain"
            />
        ),
        code: Code,
        youtube: ({ value }) => {
            if (!value || !value.url) {
                return null;
            }
            let { url } = value;
            return (
                <div className='aspect-video'>
                    <ReactPlayer url={url} width='100%' height='100%' />
                </div>
            )
        }
    },
    block: {
        h2: ({ children }) => <h2 className='text-gray-300'>{children}</h2>
    },
    marks: {
        link: ({ value, children }) => {
            let target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={target === '_blank' && 'noindex nofollow noreferrer noopener'}
                    className='text-brand-orange'
                >
                    {children}
                </a>
            )
        }
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

    return (
        <div className='relative' tabIndex='0' onKeyDown={handleKeyDown}>
            {isCopied
                ? (<span
                    className='absolute top-5 right-6 flex gap-1 items-center text-green-500 transition ease-in-out duration-300'
                    title='Copied'
                    aria-label='Copied'
                    onClick={() => setIsCopied(false)}
                >
                    Copied <CheckIcon />
                </span>)
                : (
                    <span
                        className='absolute top-6 right-6 transition ease-in-out duration-300'
                        title='Copy to clipboard'
                        aria-label='Copy to clipboard'
                        onClick={() => copyToClipboard()}
                    >
                        <ClipboardIcon />
                    </span>
                )
            }
            <Lowlight language="js" value={value.code} />
        </div>
    );
}

export default function Post() {
    const post = useLoaderData();
    // FIXME: Fix FOUC in production and hydration errors
    return (
        <main className='mt-20 py-16 px-6  max-w-3xl 2xl:max-w-3xl mx-auto text-gray-300'>
            <div className='ml-2 md:ml-6'>
                <Link
                    to="/posts"
                    prefetch='intent'
                    className="flex gap-1 hover:underline transition ease-in-out duration-300"
                >
                    <ArrowLeftIcon />Back to articles
                </Link>
            </div>
            <article className='prose text-gray-300 prose-code:text-gray-300 mt-8'>
                <div className='px-2 md:px-6'>
                    <h1 className='text-gray-300'>{post[0].title}</h1>
                    <p><time dateTime={new Date(post[0].formattedCreatedAt)}>
                        {post[0].formattedCreatedAt}
                        {/* TODO: Estimate reading time */}
                    </time> -- 2 min read
                    </p>
                </div>
                <img src={`${post[0].mainImage?.asset.url}?w=640&auto=format&fit=crop`} alt={post[0].altText} className='aspect-video w-full object-cover' />
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
        console.error({ error });
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='flex flex-col items-center gap-4 text-gray-300'>
                    <div className='w-40'>
                        <ErrorIcon />
                    </div>
                    <h1 className='font-semibold text-3xl text-red-500'>{error.status} {error.statusText}</h1>
                    <Link to="." prefetch='intent' className='px-4 py-2 rounded flex gap-1 text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'>Try again</Link>
                </div>
            </div>
        );
    } else if (error instanceof Error) {
        console.error({ error });
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <div className='flex flex-col items-center gap-4 px-6 xl:px-0'>
                    <div className='w-40'>
                        <ErrorIcon />
                    </div>
                    <h1 className='text-red-500 text-3xl'>Error fetching post</h1>
                    <Link to="." prefetch='intent' className='px-4 py-2 rounded flex gap-1 text-white bg-gradient-to-r from-[#c94b4b] to-[#4b134f] hover:bg-gradient-to-r hover:from-[#4b134f] hover:to-[#c94b4b]'>Try again</Link>
                </div>
            </div>
        );
    }
}
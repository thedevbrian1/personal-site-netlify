import { PortableText } from '@portabletext/react';
import { useLoaderData } from '@remix-run/react';
import { getPost } from '../models/post.server';

export async function loader({ params }) {
    const post = await getPost(params.slug);
    return post.result;
}
export default function Post() {
    const post = useLoaderData();
    console.log({ post });

    return (
        <main className='mt-20 text-gray-300'>
            <PortableText value={post[0].body} />
        </main>
    );
}
const queryUrl = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2022-10-20/data/query/production`;
const mutationUrl = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2022-10-20/data/mutate/production`;

export async function getPosts() {
    const postsQuery = `*[_type == 'post']{_id,title,description,slug{current},_createdAt,mainImage{asset->{url}}}`;
    const postsUrl = `${queryUrl}?query=${encodeURIComponent(postsQuery)}`;
    const res = await fetch(postsUrl);

    let data = await res.json();
    let formattedPosts = data.result.map((post) => {
        let formattedCreatedAt = new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'full',
            timeZone: 'Africa/Nairobi'
        }).format(new Date(post._createdAt));
        return { ...post, formattedCreatedAt };
    });


    return formattedPosts;
}

export async function getPost(slug) {
    const postQuery = `*[_type == 'post' && slug.current == '${slug}']{title,body,_createdAt,altText,mainImage{asset->{url}}}`;
    const postUrl = `${queryUrl}?query=${encodeURIComponent(postQuery)}`;
    const res = await fetch(postUrl);

    let data = await res.json();
    let formattedPost = data.result.map((post) => {
        let formattedCreatedAt = new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'full',
            timeZone: 'Africa/Nairobi'
        }).format(new Date(post._createdAt));
        return { ...post, formattedCreatedAt };
    });

    return formattedPost;
}
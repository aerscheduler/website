import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import PostBody from '@components/blog/post-body';
import PostHeader from '@components/blog/post-header';
import { getPostBySlug, getAllPosts } from '@lib/posts-api';
import PostTitle from '@components/blog/post-title';
import markdownToHtml from '@lib/markdownToHtml';
import Layout from '@layouts/LayoutDefault';

export default function Post({ post, morePosts }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
<>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            />
            <div className='container'>
            <PostBody content={post.content} />
            </div>
          </article>
        </>
      )}
    </>
  );
}
export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
Post.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

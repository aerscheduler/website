import MoreStories from '@components/blog/more-stories';
import HeroPost from '@components/blog/hero-post';
import { getAllPosts } from '@lib/posts-api';
import Layout from '@layouts/LayoutDefault';
import PageHeaderDefault from '@components/page-headers/PageHeaderDefault';
export default function BlogPosts({ allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
    <PageHeaderDefault pageTitle="Insights & Announcements" breadcrumbActive="Blog" />
    <section className='position-relative'>
    <div className='container z-index-1 position-relative pb-5 pb-md-11 mt-n12'>
      <div className='row'>
        <div className='col-12'>
        {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
        </div>
      </div>
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </div>
    </section>
    </>
  );
}
export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
}

BlogPosts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

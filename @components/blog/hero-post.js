import Avatar from './avatar';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import Link from 'next/link';

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <>
      <div className="mb-4">
        <CoverImage
          title={title}
          src={coverImage}
          slug={slug}
          height={800}
          width={1600}
        />
      </div>
      <div className="mb-9">
        <div>
          
        <div className="mb-4 small">
            <DateFormatter dateString={date} />
          </div>
          <h3 className="mb-4 display-5">
            <Link href={`/posts/${slug}`}>
              <a className="text-reset">{title}</a>
            </Link>
          </h3>
        </div>
        <div>
          <p className="lead mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </>
  );
}

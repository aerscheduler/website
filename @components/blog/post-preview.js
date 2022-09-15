import Avatar from './avatar';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import Link from 'next/link';
export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div className='col-md-6 mb-md-0 mb-6'>
      <div className="mb-4">
        <CoverImage
          slug={slug}
          title={title}
          src={coverImage}
          height={800}
          width={1600}
        />
      </div>
      <div className="small mb-3">
        <DateFormatter dateString={date} />
      </div>
      <h3 className="fs-4">
        <Link href={`/posts/${slug}`}>
          <a className="text-reset">{title}</a>
        </Link>
      </h3>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}

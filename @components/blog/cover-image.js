import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';

export default function CoverImage({ title, src, slug, height, width }) {
  const image = (
    <Image priority
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn('rounded-4', {
        'rounded': slug,
      })}
      layout="responsive"
      width={width}
      height={height}
    />
  );
  return (
    <div>
      {slug ? (
        <Link href={`/posts/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}

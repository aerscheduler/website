import Avatar from './avatar';
import DateFormatter from './date-formatter';
import CoverImage from './cover-image';
import PostTitle from './post-title';

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <div className='bg-blur'>
      <div className="container pt-11 pt-lg-15 pb-4">
                <div className="row pb-8 pb-lg-11">
          <div className='col-md-10 col-lg-8'>
          <PostTitle>{title}</PostTitle>
      <div className="d-none mb-6 d-md-block">
        <Avatar name={author.name} picture={author.picture} />
      </div>
          </div>
        </div>
      </div>
      </div>
      <div className="mb-4 position-relative mt-n12 container">
        <CoverImage title={title} src={coverImage} height={800} width={1600} />
        <div className='d-flex mt-4 align-items-center justify-content-between'>
          <div className="d-md-none mb-3">
            <Avatar name={author.name} picture={author.picture} />
          </div>
          <div className="d-flex align-items-center text-muted small">
            <span className='material-symbols-rounded align-middle me-2 fs-6'>event</span>
            <DateFormatter dateString={date} />
          </div>
        </div>
      </div>
    </>
  );
}

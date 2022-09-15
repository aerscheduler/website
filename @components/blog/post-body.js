export default function PostBody({ content }) {
    return (
      <div className="pb-9 pb-lg-11">
        <div
          className={['markdown']}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    );
  }
  
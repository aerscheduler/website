export default function CollapseText({id,text}) {
    return (
        <>
            <div className="collapse collapse-more" id={id}>
                <p>{text}</p>
            </div>
            <a className="collapse-text text-muted small" href={`#${id}`} data-bs-toggle="collapse" aria-expanded="false" data-text="show more"></a>
        </>
    );
}
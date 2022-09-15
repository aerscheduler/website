export default function FeatureIconWithTitle({ title, description,color,icon }) {
    return (
        <>
            <div>
                <div className="d-flex flex-wrap mb-3">
                    <span className={` ${color ? `border-${color}` : 'border-primary'} ${color ? `text-${color}` : 'text-primary'}`}>
                        {icon}
                    </span>
                    <div className="flex-grow-1 ps-3">
                        <h5 className="mb-0">{title}</h5>
                    </div>
                </div>
                <p className="mb-0">{description}</p>
            </div>
        </>
    );
}
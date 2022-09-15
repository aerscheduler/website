export default function FeatureIconLeft({ title, description,color,icon }) {
    return (
        <>
            <div>
                <div className="d-flex align-items-start">
                    <span className={` ${color ? `border-${color}` : 'border-primary'} ${color ? `text-${color}` : 'text-primary'}`}>
                        {icon}
                    </span>
                    <div className="flex-grow-1 ps-4">
                        <h5 className="mb-0">{title}</h5> 
                        <p className="mb-0 mt-2 opacity-75">{description}</p>
                    </div>
                </div>
               
            </div>
        </>
    );
}
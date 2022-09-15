export default function FeatureIconTiny({ text,color,icon }) {
    return (
        <>
            <div>
                <div className="d-flex align-items-center">
                    <span className={`flex-shrink-0 width-40 height-40 justify-content-center align-items-center d-flex rounded-circle bg-opacity-25 ${color ? `bg-${color}` : 'bg-primary'} ${color ? `text-${color}` : 'text-primary'}`}>
                        {icon}
                    </span>
                    <div className="flex-grow-1 ps-3">
                        <h6 className="mb-0 text-reset">{text}</h6>
                    </div>
                </div>
               
            </div>
        </>
    );
}
export default function FeatureIconVertical({color,title,description,icon}) {
    return (
        <div>
        <div className={`size-60 d-flex justify-content-center shadow-lg rounded-circle align-items-center mb-4 bg-opacity-25 ${color ? `bg-${color}` : 'bg-primary'} ${color ? `text-${color}` : 'text-primary'}`}>
            {icon}
        </div>
        <div>
            <h5 className="mb-3">{title}</h5> 
            <p className="mb-0 text-muted">{description}</p>
        </div>
    </div>
    );
}
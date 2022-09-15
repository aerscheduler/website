export default function FeatureIconDefault({icon,color,title,description}) {
    return (
        <>
           <div className="text-center">
           <div className={`mb-4 ${color ? `text-${color}` : 'text-primary'}`}>
        {icon}
        </div>
        <h5 className="mb-3">{title}</h5>
        <p className="mb-0 px-xl-5">{description}</p>
           </div>
        </>
    );
}
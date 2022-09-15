import Link from "next/link";

export default function CtaVertical({heading,subheading,text,link,action}) {
    return (
        <div className="row justify-content-between align-items-center">
            <div className="col-md-7 col-xl-6 mb-5 mb-md-0">
                <h2 className="display-5 mb-0">{heading}</h2>
                
            </div>
            <div className="col-md-5">
            <p className="lead mb-4">
                   {subheading}
                </p>
                <p className="mb-5">{text}</p>
                <Link href={action || "#"}><a className="btn btn-lg btn-primary">{link}
                <span className="material-symbols-rounded ms-2 fs-5 align-middle">arrow_forward</span>
                </a></Link>
            </div>
        </div>
    );
}
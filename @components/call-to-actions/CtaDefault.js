import Link from "next/link";

export default function CtaDefault({heading,subheading,link,action}) {
    return (
        <div className="row justify-content-center align-items-center">
            <div className="col-md-7 col-xl-6">
                <h2 className="display-5 mb-4" data-aos="fade-up">{heading}</h2>
                <p className="lead mb-5 mb-md-0" data-aos="fade-up" data-aos-delay="100">
                   {subheading}
                </p>
            </div>
            <div className="col-md-5 col-xl-4 text-md-end" data-aos="fade-up" data-aos-delay="150">
                <Link href={action || "#"}><a className="btn hover-lift btn-lg btn-primary">{link}
                <span className="material-symbols-rounded ms-2 fs-5 align-middle">arrow_forward</span>
                </a></Link>
            </div>
        </div>
    );
}
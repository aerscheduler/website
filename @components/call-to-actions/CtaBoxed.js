import Link from "next/link";

export default function CtaBoxed({link,subheading,heading,color,action}) {
    return (

        <div className={`px-4 py-7 py-lg-9 rounded-4 position-relative z-index-1 overflow-hidden text-white ${color ? `bg-${color}` : 'bg-primary'}`}>
            <div className="row position-relative">
                <div className="col-lg-9 col-md-10 mx-auto text-center">
                    <h5 className="mb-4" data-aos="fade-up">{subheading}</h5>
                    <h2 className="display-4 mb-5" data-aos="fade-up">{heading}</h2>
                    <div className="d-flex flex-wrap justify-content-center">
                        <div data-aos="fade-up">
                            <Link href={action || "#"}>
                                <a className="btn btn-white btn-lg hover-lift me-3">{link} <span className="material-symbols-rounded fs-5 ms-2 align-middle lh-1">arrow_forward</span></a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
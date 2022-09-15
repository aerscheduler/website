import GetImage from "@lib/GetImage";
import Link from "next/link";
export default function CustomerStoryCard({ customer }) {
    return (
        <div className="col-lg-4 col-sm-6 mb-4" data-aos="fade-up">
            <div className="card hover-lift border-0 h-100 shadow overflow-hidden">
                <div className="position-relative overflow-hidden">
                    <GetImage className="rounded-0" src={customer.banner} width="640" height="426" alt="" layout="responsive" />
                    <div className="card-img-overlay bg-dark rounded-0 p-4 p-xl-5 bg-opacity-50 d-flex align-items-end">
                        <div className="width-120 h-auto">
                            <GetImage src={customer.brand} width="140" height="48" latout="responsive" alt="customer" />
                        </div>
                    </div>
                </div>
                <div className="card-body flex-grow-1 p-4">
                    <h5 className="mb-0 lh-base">{customer.quote}</h5>
                </div>
                <div className="mt-auto pb-4 px-4">
                    <Link href={customer.link}>
                        <a className="btn btn-primary hover-lift">Read full story <span className="material-symbols-rounded align-middle fs-5 ms-2">arrow_forward</span></a>
                    </Link>
                </div>
            </div>
        </div>
    );
}


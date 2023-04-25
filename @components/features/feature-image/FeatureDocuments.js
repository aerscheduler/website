import Image from "next/image";
import Link from "next/link";
import ListCheck from "@components/lists/ListCheck";
export const FeatureImage2 = "/img/integrations.svg";
export default function FeatureDocuments() {
  return (
    <div className="row align-items-center">
      {/* <div className="col-md-6 mb-6 mb-md-0" data-aos="fade-up" data-aos-delay="100">
                <div className="position-relative">
                    <Image src={FeatureImage2} priority layout="responsive" width="724" height="428" className="rounded-4" alt="" />
                </div>
            </div> */}
      {/* <div className="col-lg-5 col-md-6 ms-lg-auto"> */}
      <div className="col-md-6 col-lg-9 mx-auto">
        <h2 className="position-relative fs-1 mb-4" data-aos="fade-up">
          Upload secure documents.
        </h2>
        <p className="lead d-lg-block mb-4" data-aos="fade-up" data-aos-delay="100">
          Create document types and have pilots upload their documents. Documents are stored securely and can be viewed by administrators.
        </p>
        <ul className="list-unstyled mb-5" data-aos="fade-up" data-aos-delay="200">
          <ListCheck className="d-flex mb-3 align-items-start" listText="Create restricted documents that only admins can upload or modify." />
          <ListCheck className="d-flex mb-3 align-items-start" listText="Set optional expiration for documents" />
          <ListCheck className="d-flex mb-3 align-items-start" listText="Pilots will receive reminders when their documents are about to expire." />
        </ul>
        <div data-aos="fade-up" data-aos-delay="300">
          <Link href="https://app.aerscheduler.com">
            <a className="fw-bold">
              Get Started
              <span className="material-symbols-rounded fs-5 ms-2 align-middle lh-1">arrow_forward</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

import ListCheck from "@components/lists/ListCheck";
import Link from "next/link";

export default function PricingDefault() {
  return (
    <div className="row align-items-center justify-content-center">
      {/* <div className="col-lg-4 col-sm-10 mx-auto" data-aos="fade-up" data-aos-delay="100">
        <div className="card mb-4 mb-lg-0 shadow-lg rounded-4 border-0 overflow-hidden">
          <div className="px-4 py-4">
            <h5 className="mb-2">Basic</h5>
            <p className="mb-0 text-muted">For individuals or startup teams..</p>
          </div>
          <div className="card-body pt-0 pb-4 px-4">
            <h1 className="display-5"><span className="fw-light small">US$</span> 0</h1>
            <small className="text-muted font-monospace mb-4 d-block">Free forever</small>

            <button type="button" className="w-100 btn btn-lg btn-gradient-secondary hover-lift">Get Basic Plan</button>

            <ul className="list-unstyled mb-0 pt-4">
              <ListCheck className="d-flex align-items-center mb-3" listText="Unlimited tasks" />
              <ListCheck className="d-flex align-items-center mb-3" listText="5 Projects" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Unlimited messages" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Collaborate with 5 members" />
              <ListCheck className="d-flex align-items-center mb-3" listText="10/GB File storage" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Calendar view" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Assignee & Due dates" />
            </ul>
          </div>
        </div>
      </div> */}
      <div className="col-lg-4 col-sm-10 mx-auto" data-aos="fade-up">
        <div className="card mb-4 mb-lg-0 shadow-lg rounded-4 border-0 overflow-hidden">
          <span className="badge bg-warning rounded-bottom-0 py-3 fs-6">Free</span>
          <div className="px-4 py-4">
            <h5 className="mb-2">Basic</h5>
            <p className="text-muted mb-0">For aviation programs that only need resource and personnel scheduling.</p>
          </div>
          <div className="card-body pt-0 pb-4 px-4">
            <h1 className="display-5">
              <span className="fw-light small">US$</span> 0
            </h1>
            <small className="text-muted font-monospace mb-4 d-block">Per Month</small>

            <Link href="/download">
              <a className="w-100 btn btn-lg btn-primary hover-lift">Download App</a>
            </Link>
            <ul className="list-unstyled mb-0 pt-4">
              <ListCheck className="d-flex align-items-center mb-3" listText="Unlimited students" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Unlimited instructors" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Unlimited resources" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Unlimited reservations" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Unlimited locations" />
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="col-lg-4 col-sm-10 mx-auto" data-aos="fade-up" data-aos-delay="150">
        <div className="card shadow-lg rounded-4 border-0 overflow-hidden">

          <div className="px-4 py-4">
            <h5 className="mb-2">Business</h5>
            <p className="text-muted mb-0">For teams and companies that need to manage work across initiatives.</p>
          </div>
          <div className="card-body pt-0 pb-4 px-4">
            <h1 className="display-5"><span className="fw-light small">US$</span> 49</h1>
            <small className="text-muted font-monospace mb-4 d-block">Per Month</small>

            <button type="button" className="w-100 btn btn-lg btn-gradient-secondary hover-lift">Get Business Plan</button>
            <ul className="list-unstyled mb-0 pt-4">
              <ListCheck className="d-flex align-items-center mb-3" listText="Admin Console" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Portfolios" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Goals" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Workloads" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Custom builders" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Field lock" />
              <ListCheck className="d-flex align-items-center mb-3" listText="Unlimited Integrations" />
              <ListCheck className="d-flex align-items-center" listText="Full access" />
            </ul>
          </div>
        </div>

      </div> */}
    </div>
  );
}

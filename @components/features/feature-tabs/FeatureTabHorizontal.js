import FeatureScheduling from "../feature-image/FeatureScheduling";
import FeatureMaintenance from "../feature-image/FeatureMaintenance";
import FeaturePayments from "../feature-image/FeaturePayments";
import FeatureDocuments from "../feature-image/FeatureDocuments";
import FeatureAvailability from "../feature-image/FeatureAvailability";
import FeatureReports from "../feature-image/FeatureReports";
export default function FeatureTabHorizontal() {
  return (
    <div className="row justify-content-between align-items-start">
      <div className="col-12">
        <nav className="nav w-lg-75 w-xl-50 mx-auto nav-pills nav-fill p-2 justify-content-center rounded-pill bg-body shadow-lg nav-shadow mb-6 mb-lg-9">
          <a href="#scheduling" data-bs-toggle="tab" className="nav-link rounded-pill px-md-4 py-md-3 active">
            <div className="d-flex align-items-center justify-content-center">
              <div className="flex-shrink-0 me-2 d-none d-sm-block">
                <span className="material-symbols-rounded align-middle fs-4">schedule</span>
              </div>
              <h6 className="mb-0">Scheduling</h6>
            </div>
          </a>
          <a href="#payments" data-bs-toggle="tab" className="nav-link rounded-pill px-md-4 py-md-3">
            <div className="d-flex align-items-center justify-content-center">
              <div className="flex-shrink-0 me-2 d-none d-sm-block">
                <span className="material-symbols-rounded align-middle fs-4">credit_card</span>
              </div>
              <h6 className="mb-0">Payments</h6>
            </div>
          </a>
          <a href="#maintenance" data-bs-toggle="tab" className="nav-link rounded-pill px-md-4 py-md-3">
            <div className="d-flex align-items-center justify-content-center">
              <div className="flex-shrink-0 me-2 d-none d-sm-block">
                <span className="material-symbols-rounded align-middle fs-4">build</span>
              </div>
              <h6 className="mb-0">Maintenance</h6>
            </div>
          </a>
          <a href="#documents" data-bs-toggle="tab" className="nav-link rounded-pill px-md-4 py-md-3">
            <div className="d-flex align-items-center justify-content-center">
              <div className="flex-shrink-0 me-2 d-none d-sm-block">
                <span className="material-symbols-rounded align-middle fs-4">description</span>
              </div>
              <h6 className="mb-0">Documents</h6>
            </div>
          </a>
          <a href="#availability" data-bs-toggle="tab" className="nav-link rounded-pill px-md-4 py-md-3">
            <div className="d-flex align-items-center justify-content-center">
              <div className="flex-shrink-0 me-2 d-none d-sm-block">
                <span className="material-symbols-rounded align-middle fs-4">timer</span>
              </div>
              <h6 className="mb-0">Availability</h6>
            </div>
          </a>
          <a href="#reports" data-bs-toggle="tab" className="nav-link rounded-pill px-md-4 py-md-3">
            <div className="d-flex align-items-center justify-content-center">
              <div className="flex-shrink-0 me-2 d-none d-sm-block">
                <span className="material-symbols-rounded align-middle fs-4">grading</span>
              </div>
              <h6 className="mb-0">Reports</h6>
            </div>
          </a>
        </nav>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="scheduling">
            <FeatureScheduling />
          </div>
          <div className="tab-pane fade" id="payments">
            <FeaturePayments />
          </div>
          <div className="tab-pane fade" id="maintenance">
            <FeatureMaintenance />
          </div>
          <div className="tab-pane fade" id="documents">
            <FeatureDocuments />
          </div>
          <div className="tab-pane fade" id="availability">
            <FeatureAvailability />
          </div>
          <div className="tab-pane fade" id="reports">
            <FeatureReports />
          </div>
        </div>
      </div>
    </div>
  );
}

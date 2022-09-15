
import FeatureImageLeft1 from "../feature-image/FeatureImageLeft1";
import FeatureImageLeft2 from "../feature-image/FeatureImageLeft2";
import FeatureImageRight1 from "../feature-image/FeatureImageRight1";
export default function FeatureTabHorizontal() {
    return (
        <div className="row justify-content-between align-items-start">
            <div className="col-12">
                <nav className="nav w-lg-75 w-xl-50 mx-auto nav-pills nav-fill p-2 justify-content-center rounded-pill bg-body shadow-lg nav-shadow mb-6 mb-lg-9">
                    <a href="#analytics1" data-bs-toggle="tab" className="nav-link rounded-pill px-md-4 py-md-3 active">
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="flex-shrink-0 me-2 d-none d-sm-block">
                                <span className="material-symbols-rounded align-middle fs-4">schedule</span>
                            </div>
                            <h6 className="mb-0">Schedule</h6>
                        </div>
                    </a>
                    <a href="#messenger1" data-bs-toggle="tab" className="nav-link rounded-pill px-md-4 py-md-3">
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="flex-shrink-0 me-2 d-none d-sm-block">
                                <span className="material-symbols-rounded align-middle fs-4">air</span>
                            </div>
                            <h6 className="mb-0">Aircraft</h6>
                        </div>
                    </a>
                    <a href="#deploy1" data-bs-toggle="tab" className="nav-link rounded-pill px-md-4 py-md-3">
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="flex-shrink-0 me-2 d-none d-sm-block">
                                <span className="material-symbols-rounded align-middle fs-4">people</span>
                            </div>
                            <h6 className="mb-0">Personnel</h6>
                        </div>
                    </a>
                </nav>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="analytics1">
                    <FeatureImageLeft1/>
                    </div>
                    <div className="tab-pane fade" id="messenger1">
                    <FeatureImageRight1/>
                    </div>
                    <div className="tab-pane fade" id="deploy1">
                    <FeatureImageLeft2/>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
}
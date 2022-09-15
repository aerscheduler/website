import Image from "next/image";
export const tabDeploy = "/img/integrations.svg";
export const tabImage1 = "/img/shots/dashboard.svg";
export const FeatureImage1 = "/img/shots/01.png";
export const FeatureImage2 = "/img/shots/02.png";
export const FeatureImage3 = "/img/shots/03.png";
export default function FeatureTabDefault() {
  return (
    <div className="row justify-content-between align-items-start">
      <div className="col-lg-4 mb-5 mb-lg-0">
        <nav className="nav nav-pills flex-column align-items-stretch nav-shadow">
          <a href="#analytics" data-bs-toggle="tab" className="nav-link active text-start p-4 flex-grow-1">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-4">
                <span className="material-symbols-rounded align-middle fs-3">insights</span>
              </div>
              <div className="flex-grow-1">
                <h5>Dashboard Overview</h5>
                <p className="opacity-75 mb-0">Provide overview via a dashboard.</p>
              </div>
            </div>
          </a>
          <a href="#scale" data-bs-toggle="tab" className="nav-link text-start p-4 flex-grow-1">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-4">
                <span className="material-symbols-rounded align-middle fs-3">scale</span>
              </div>
              <div className="flex-grow-1">
                <h5>Manage Resources</h5>
                <p className="opacity-75 mb-0">Manage your aircrafts, simulators, personnel, and more.</p>
              </div>
            </div>
          </a>
          <a href="#deploy" data-bs-toggle="tab" className="nav-link text-start p-4 flex-grow-1">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0 me-4">
                <span className="material-symbols-rounded align-middle fs-3">cloud_sync</span>
              </div>
              <div className="flex-grow-1">
                <h5>Schedule</h5>
                <p className="opacity-75 mb-0">Easy scheduling for students, instructors, and renters</p>
              </div>
            </div>
          </a>
        </nav>
      </div>
      <div className="col-lg-8 col-xl-7 ms-xl-auto">
        <div className="tab-content">
          <div className="tab-pane fade show active" id="analytics">
            <div className="row align-items-center justify-content-center">
              <div className="col-6 col-md-5">
                <div className="position-relative overflow-hidden rounded-3 shadow-lg">
                  <Image src={FeatureImage1} priority layout="responsive" width="275" height="293" alt="" />
                </div>
              </div>
              <div className="col-6 col-md-5">
                <div className="position-relative overflow-hidden mb-4 rounded-3 shadow-lg">
                  <Image src={FeatureImage2} priority layout="responsive" width="275" height="268" alt="" />
                </div>
                <div className="position-relative overflow-hidden rounded-3 shadow-lg">
                  <Image src={FeatureImage3} priority layout="responsive" width="275" height="320" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div id="scale" className="tab-pane fade">
            <div className="position-relative overflow-hidden rounded-3 shadow-lg">
              <Image priority src={tabImage1} alt="" width="1424" height="1014" layout="responsive" />
            </div>
          </div>
          <div className="tab-pane fade" id="deploy">
            <div className="position-relative overflow-hidden">
              <Image priority src={tabDeploy} alt="" width="724" height="428" layout="responsive" />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

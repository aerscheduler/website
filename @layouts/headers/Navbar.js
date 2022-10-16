import ActiveLink from "./ActiveLink";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Navbar() {
  const router = useRouter();
  return (
    <>
      <ul className="me-auto navbar-nav ms-xl-4">
        {/* <li className="nav-item dropdown">
          <a className={router.pathname.startsWith("/landings") ? "nav-link dropdown-arrow active" : "nav-link dropdown-arrow"} href="#" data-bs-toggle="dropdown">
            Landings
            <span className="material-symbols-sharp align-middle lh-1 dropdown-arrow-icon">expand_more</span>
          </a>
          <div className="dropdown-menu">
            <ActiveLink activeClassName="active" href="/landings">
              <a className="dropdown-item">Default</a>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/landings/index-signup">
              <a className="dropdown-item">SignUp</a>
            </ActiveLink>
            <ActiveLink activeClassName="active" href="/landings/index-decorative">
              <a className="dropdown-item">Decorative</a>
            </ActiveLink>
          </div>
        </li> */}
        {/* <li className="nav-item dropdown position-static">
          <a className={router.pathname.startsWith("/features") ? "nav-link dropdown-arrow active" : "nav-link dropdown-arrow"} href="#" data-bs-toggle="dropdown">
            Features
            <span className="material-symbols-sharp align-middle lh-1 dropdown-arrow-icon">expand_more</span>
          </a>
          <div className="dropdown-menu dropdown-menu-full">
            <div className="row">
              <div className="col-lg-3 me-lg-auto">
                <h6 className="dropdown-header">Overview</h6>
                <ActiveLink activeClassName="active" href="/features">
                  <a className="dropdown-item py-3 mb-3">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 shadow-sm size-40 d-flex align-items-center justify-content-center me-3 rounded-circle bg-white">
                        <span className="material-symbols-outlined align-middle fs-4 lh-1 text-secondary">fact_check</span>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">Overview</h6>
                        <small className="opacity-75 lh-sm">Full list of features</small>
                      </div>
                    </div>
                  </a>
                </ActiveLink>
              </div>
              <div className="col-lg-8 ps-lg-8 border-start-lg">
                <h6 className="dropdown-header">Components</h6>
                <div className="row">
                  <div className="col-lg-4 mb-4 mb-lg-0">
                    <ActiveLink activeClassName="active" href="/features/animations">
                      <a className="dropdown-item">Animations</a>
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/features/buttons">
                      <a className="dropdown-item">Buttons</a>
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/features/call-to-actions">
                      <a className="dropdown-item">Call to actions</a>
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/features/collapse">
                      <a className="dropdown-item">Collapse</a>
                    </ActiveLink>
                  </div>
                  <div className="col-lg-4 mb-4 mb-lg-0">
                    <ActiveLink activeClassName="active" href="/features/clients">
                      <a className="dropdown-item">Clients</a>
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/features/forms">
                      <a className="dropdown-item">Forms</a>
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/features/feature-images">
                      <a className="dropdown-item">Feature Images</a>
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/features/feature-icons">
                      <a className="dropdown-item">Icon Cards</a>
                    </ActiveLink>
                  </div>
                  <div className="col-lg-4 mb-4 mb-lg-0">
                    <ActiveLink activeClassName="active" href="/features/pricing-tables">
                      <a className="dropdown-item">Pricing tables</a>
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/features/swiper-slider">
                      <a className="dropdown-item">Swiper Slider</a>
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/features/testimonials">
                      <a className="dropdown-item">Testimonials</a>
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/features/tabbed-content">
                      <a className="dropdown-item">Tabbed-content</a>
                    </ActiveLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li> */}
        <li className="nav-item" style={{marginLeft: "30px"}}>
          <ActiveLink href="/pricing" activeClassName="active">
            <a className="nav-link">Pricing</a>
          </ActiveLink>
        </li>
        <li className="nav-item">
          <ActiveLink href="/integrations" activeClassName="active">
            <a className="nav-link">integrations</a>
          </ActiveLink>
        </li>
        <li className="nav-item">
          <ActiveLink href="/download" activeClassName="active">
            <a className="nav-link">Download</a>
          </ActiveLink>
        </li>
      </ul>
      <ul className="navbar-nav ms-xl-auto">
        {/* <li className="nav-item dropdown mb-3 mb-lg-0">
          <a className={router.pathname.startsWith("/more") ? "nav-link dropdown-arrow active" : "nav-link dropdown-arrow"} href="#" data-bs-toggle="dropdown">
            Pages
            <span className="material-symbols-sharp align-middle lh-1 dropdown-arrow-icon">expand_more</span>
          </a> */}
        {/* <div className="dropdown-menu dropdown-menu-end"> */}
        {/* <ActiveLink activeClassName="active" href="/more/customers">
              <a className="dropdown-item">Customers</a>
            </ActiveLink> */}
        {/* <ActiveLink activeClassName="active" href="/more/typography">
              <a className="dropdown-item">Typography</a>
            </ActiveLink> */}
        {/* <ActiveLink activeClassName="active" href="/404">
              <a className="dropdown-item">Custom 404</a>
            </ActiveLink> */}
        {/* <ActiveLink activeClassName="active" href="/pricing">
              <a className="dropdown-item">Demo request</a>
            </ActiveLink> */}
        {/* <ActiveLink activeClassName="active" href="/auth/signin">
              <a className="dropdown-item">Sign In</a>
            </ActiveLink> */}
        {/* <ActiveLink activeClassName="active" href="/auth/signup">
              <a className="dropdown-item">Sign Up</a>
            </ActiveLink> */}
        {/* <ActiveLink activeClassName="active" href="/auth/forgot-password">
              <a className="dropdown-item">Forget password</a>
            </ActiveLink> */}
        {/* </div> */}
        {/* </li> */}
        <li className="nav-item mb-3 mb-lg-0">
          <ActiveLink activeClassName="active" href="/download">
            <a className="btn btn-secondary btn-sm hover-lift">
              Start For Free
              <span className="align-middle material-symbols-rounded fs-5 ms-1 d-none d-xl-inline-block">arrow_forward</span>
            </a>
          </ActiveLink>
        </li>
        {/* <li className="nav-item">
          <ActiveLink activeClassName="active" href="/auth/signin">
            <a className="nav-link">Sign In</a>
          </ActiveLink>
        </li> */}
        {/* <li className="mt-4 mt-lg-0 nav-item d-flex align-items-center justify-content-lg-center flex-lg-column h-100 ms-0 ms-xl-3">
          <label className="dark-mode-checkbox d-flex align-items-center justify-content-center rounded-circle nav-link p-0" labelfor="ChangeTheme">
            <input type="checkbox" className="appearance-none" id="ChangeTheme" />

            <span className="dark-mode-icons size-30 d-inline-flex align-items-center justify-content-center me-2 me-lg-0">
              <span className="material-symbols-rounded align-middle">dark_mode</span>
              <span className="material-symbols-rounded align-middle">light_mode</span>
            </span>
            <span className="ms-1 d-lg-none">Dark Mode</span>
          </label>
        </li> */}
      </ul>
    </>
  );
}

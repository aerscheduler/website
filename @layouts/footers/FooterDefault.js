import Link from "next/link";
import Image from "next/image";
// export const footerLogo = "/img/logo-white.svg";
export const Logo = "/img/logos/text_light.png";
export default function FooterDefault() {
  return (
    <footer className="footer bg-dark text-white position-relative overflow-hidden">
      <div className="container pt-9 pt-lg-11 pb-4 position-relative z-index-1">
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-5">
            <div className="mb-4">
              <Link href="/">
                <a className="text-reset d-table width-120">
                  {/* <Image src={footerLogo} width="704" height="178" layout="responsive" alt="" /> */}
                  <Image src={Logo} layout="fixed" width="200" height="20" alt="Logo" />
                </a>
              </Link>
            </div>
            <p className="text-muted">
              AerScheduler is an easy way to manage your planes, pilots, scheduling, payments, documents, maintenance, and more. It's free to use and only takes a few minutes to get started
            </p>
          </div>
          <div className="col-md-3 mx-auto col-lg-2 mb-5">
            <ul className="list-unstyled">
              <li>
                <Link href={`/terms-and-conditions`}>
                  <a aria-label="Terms and Conditions">Terms and Conditions</a>
                </Link>
              </li>
              <li>
                <Link href={`/privacy`}>
                  <a aria-label="Privacy">Privacy</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mx-auto col-lg-2 mb-5"></div>
          <div className="col-lg-4 mb-5">
            <small className="text-muted">© Copyright 2023. AerScheduler</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

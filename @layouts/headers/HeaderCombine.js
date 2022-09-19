import "material-symbols";
import Link from "next/link";
import { useEffect } from "react";
import Headroom from "headroom.js";
import Navbar from "./Navbar";
import Image from "next/image";
export const Logo = "/img/logos/logo_with_text_dark.png";
export const LogoDark = "/img/logos/logo_with_text_light.png";

export default function HeaderCombine() {
  useEffect(() => {
    const navbarSitcky = document.querySelector(".navbar-sticky");
    //Header
    var headroom = new Headroom(navbarSitcky);
    headroom.init();
  });
  return (
    <nav className="navbar navbar-expand-lg navbar-transparent navbar-sticky navbar-light">
      <div className="container-fluid position-relative">
        <Link href="/">
          <a className="navbar-brand">
            <div className="logo-light">
              <Image src={Logo} layout="responsive" width="120" height="44" alt="Logo" />
            </div>
            <div className="logo-dark">
              <Image src={LogoDark} layout="responsive" width="120" height="44" alt="Logo" />
            </div>
          </a>
        </Link>

        <button
          className="navbar-toggler border-0 p-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbarDefault"
          aria-controls="offcanvasNavbarDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-rounded align-middle text-reset">menu</span>
        </button>
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" id="offcanvasNavbarDefault" tabIndex="-1" aria-labelledby="offcanvasNavbarDefaultLabel">
          <div className="offcanvas-header justify-content-end">
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <Navbar />
          </div>
        </div>
      </div>
    </nav>
  );
}

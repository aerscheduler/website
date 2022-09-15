import Image from "next/image";
import Link from "next/link";
import 'material-symbols'
export const HeroStaticBG = '/img/illustrations/6.svg'
export default function HeroSignUp() {
    return (
        <section className="pt-11 pt-lg-15 pb-7 position-relative overflow-hidden">
            {/**Shape */}
            <svg className="position-absolute end-0 top-0 w-75 w-lg-40 h-auto opacity-25 text-info" width="151" height="151" viewBox="0 0 151 151" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0C-1.73356e-06 19.8296 3.90573 39.465 11.4942 57.7852C19.0826 76.1054 30.2052 92.7515 44.2269 106.773C58.2485 120.795 74.8946 131.917 93.2148 139.506C111.535 147.094 131.17 151 151 151V1.52588e-05L0 0Z" fill="currentColor"/>
</svg>

            <div className="container position-relative">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-center text-lg-start col-md-10 mb-5 mb-lg-0 me-lg-auto mx-md-auto">
                        <h1 className="mb-4 display-4 z-index-1 position-relative">
                        Work together in one shared space.
                        </h1>
                        <p className="mb-4 mb-lg-5 lead">Get started today</p>
                        <div className="w-xl-75 position-relative z-index-1">
                        <form>
                            <div className="position-relative mb-2 d-flex flex-column">
                                <input type="email" className="form-control mb-2 shadow form-control-lg" placeholder="Your work email" />
                                <button type="submit" className="btn btn-primary btn-lg">Start free trail</button>
                            </div>
                        </form>
                        </div>
                        <p className="mb-0 small opacity-50">
                            No credit card required
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-10 mx-md-auto ms-lg-0 position-relative">
                    <div className="position-relative overflow-hidden">
                                    <Image priority layout="responsive" width="544" height="410" className="rounded-3" src={HeroStaticBG} alt="" />
                                </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
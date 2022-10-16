import Image from "next/image";
import Link from "next/link";
import ListCheck from "@components/lists/ListCheck";
export const FeatureImage2 = '/img/integrations.svg'
export default function FeatureImageLeft2() {
    return (
        <div className="row align-items-center">
            {/* <div className="col-md-6 mb-6 mb-md-0" data-aos="fade-up" data-aos-delay="100">
                <div className="position-relative">
                    <Image src={FeatureImage2} priority layout="responsive" width="724" height="428" className="rounded-4" alt="" />
                </div>
            </div> */}
            {/* <div className="col-lg-5 col-md-6 ms-lg-auto"> */}
            <div className="col-md-6 col-lg-5 mx-auto">
                <h2 className='position-relative fs-1 mb-4' data-aos="fade-up">Sign up anytime, anywhere.</h2>
                <p className='lead d-none d-lg-block mb-4' data-aos="fade-up" data-aos-delay="100">After you create an account, you can simply create an organization or join an existing one, all through our app.</p>
                <ul className='list-unstyled mb-5' data-aos="fade-up" data-aos-delay="200">
                    <ListCheck className="d-flex mb-3 align-items-start" listText="Assign roles to personnel. There are students, instructors, renters, dispatchers, technicians, and more to come." />
                    <ListCheck className="d-flex mb-3 align-items-start" listText="Assign students to instructors and restrict who can fly with who." />
                    <ListCheck className="d-flex mb-3 align-items-start" listText="Invite users to your program or accept requests to join." />
                </ul>
                <div data-aos="fade-up" data-aos-delay="300">
                    <Link href='/pricing'><a className='fw-bold'>Learn More About Our App
                        <span className='material-symbols-rounded fs-5 ms-2 align-middle lh-1'>arrow_forward</span>
                    </a></Link>
                </div>
            </div>
        </div>
    );
}
import { useState } from "react";
import 'material-symbols'
import Link from "next/link";
export default function FormSignUp() {
    const [pwd, setPwd] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="user_name" className="form-label">Name</label>
                <input id="user_name" type="text" className="form-control" placeholder="John" />
            </div>
            <div className="mb-3">
                <label htmlFor="user_work_email" className="form-label">Work Email</label>
                <input id="user_work_email" type="text" className="form-control" placeholder="john@doe.com" />
            </div>
            <div className="mb-3">
                <label htmlFor="user_password" className="form-label">Password</label>
                <div className="position-relative">
                <input name="user_password" type={isRevealPwd ? "text" : "password"}
          value={pwd}
          onChange={e => setPwd(e.target.value)} id="user_password" className="form-control pe-5" />
          {/* Password icon */}
          <span role="button"
          className={isRevealPwd ? "password-hide position-absolute end-0 top-50 translate-middle-y me-2 size-30 d-flex align-items-center justify-content-center" : "password-show position-absolute end-0 top-50 translate-middle-y size-30 me-2 d-flex align-items-center justify-content-center"}
          onClick={() => setIsRevealPwd(prevState => !prevState)}></span>
                </div>
            </div>
            <div className="mb-3 small text-muted">
                By clicking on <strong>Sign Up</strong>, you&apos;re agree to our company&apos;s 
                <br/>
                 <span><Link href="#"><a className="text-decoration-underline d-inline-block">Terms</a></Link></span> 
                 <span> and </span> 
                  <span><Link href="#"><a className="text-decoration-underline d-inline-block">Conditions</a></Link></span>
                
            </div>
            <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </div>
        </form>
    );
}
import { useState } from "react";
import 'material-symbols'
import Link from "next/link";
export default function FormSignIn() {
    const [pwd, setPwd] = useState('');
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="login_name" className="form-label">Username or Email</label>
                <input id="login_name" type="email" placeholder="username or email" className="form-control" required />
            </div>
            
                <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                <label htmlFor="login_password" className="form-label mb-0">Password</label>
                <Link href="/auth/forgot-password"><a className="small">Forgot Password?</a></Link>
                </div>
                <div className="position-relative">
                <input name="login_password" type={isRevealPwd ? "text" : "password"}
          value={pwd}
          onChange={e => setPwd(e.target.value)} id="login_password" className="form-control pe-5" />
          {/* Password icon */}
          <span role="button"
          className={isRevealPwd ? "password-hide position-absolute end-0 top-50 translate-middle-y me-2 size-30 d-flex align-items-center justify-content-center" : "password-show position-absolute end-0 top-50 translate-middle-y size-30 me-2 d-flex align-items-center justify-content-center"}
          onClick={() => setIsRevealPwd(prevState => !prevState)}></span>
                </div>
            </div>
            <div className="d-grid mb-3">
                <button type="submit" className="btn btn-primary">Sign In</button>
            </div>
        </form>
    );
}
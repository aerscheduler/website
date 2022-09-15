import 'material-symbols'
export default function FormForgotPassword() {
    return (
        <form>
            <div className="mb-3">
                <input name="reset_pass_email" id="reset_pass_email" placeholder='Registered Email' type="email" className="form-control" required />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">Send Reset Link</button>
            </div>
        </form>
    );
}
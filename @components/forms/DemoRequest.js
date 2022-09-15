import Link from "next/link";
import Select from "react-select";
import { selectThemeColors } from "@lib/selectThemeColors";
const teamSizeOptions = [
    { value: '1-10', label: '1-10' },
    { value: '10-25', label: '10-25' },
    { value: '25-50', label: '25-50' },
    { value: '50-100', label: '50-100' },
    { value: 'Over 100', label: 'Over 100' }
]

export default function FormDemoRequest() {
    return (
        <div className="position-relative z-index-1">
            <form>
                <div className="mb-3">
                    <label htmlFor="demo_f_name" className="form-label">First Name</label>
                    <input id="demo_f_name" type="text" className="form-control" placeholder="John" />
                </div>
                <div className="mb-3">
                    <label htmlFor="demo_l_name" className="form-label">Last Name</label>
                    <input id="demo_l_name" type="text" className="form-control" placeholder="Doe" />
                </div>
                <div className="mb-3">
                    <label htmlFor="demo_email" className="form-label">Work Email <small className="text-danger">*</small></label>
                    <input id="demo_email" type="email" className="form-control" placeholder="john@doe.com" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="demo_job_title" className="form-label">Job Title</label>
                    <input id="demo_job_title" type="text" className="form-control" placeholder="React Developer" />
                </div>
                <div className="mb-3">
                    <label className='form-label'>Team size</label>
                    <Select id="teamSize"
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        defaultValue={teamSizeOptions[1]}
                        name='teamSize'
                        options={teamSizeOptions}
                        isClearable={false}
                        isSearchable={false}
                    />
                </div>
                <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary">Submit Request</button>
                </div>
            </form>
            <p className="mb-0 small text-muted">We care about your privacy. To learn more, see our <Link href="/"><a className="text-decoration-underline">Privacy Policy</a></Link></p>
        </div>
    );
}
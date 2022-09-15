export default function PricingComparison() {
    return (
        <div className="table-responsive">
            <table className="table table-striped text-center text-nowrap mb-0">
              <thead>
                <tr>
                  <th style={{ minWidth: '40%' }}></th>
                  <th style={{ minWidth: '20%' }}>
                    <h5 className="mb-0">Basic</h5>
                     </th>
                  <th style={{ minWidth: '20%' }}>
                  <h5 className="mb-0">Premium</h5>
                    
                  </th>
                  <th style={{ minWidth: '20%' }}>
                  <h5 className="mb-0">Business</h5>
                     
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="text-start">Projects</th>
                  <td><span className="fs-6">1</span></td>
                  <td>
                  <span className="fs-6">Unlimited</span>
                  </td>
                  <td>
                  <span className="fs-6">Unlimited</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">Unlimited Messages</th>
                  <td><span className="align-middle fs-3 text-success material-symbols-outlined">
                    check
                  </span></td>
                  <td><span className="align-middle fs-3 text-success material-symbols-outlined">
                    check
                  </span></td>
                  <td><span className="align-middle fs-3 text-success material-symbols-outlined">
                    check
                  </span></td>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <th scope="row" className="text-start">Permissions</th>
                  <td><span className="align-middle fs-3 text-success material-symbols-outlined">
                    check
                  </span></td>
                  <td><span className="align-middle fs-3 text-success material-symbols-outlined">
                    check
                  </span></td>
                  <td><span className="align-middle fs-3 text-success material-symbols-outlined">
                    check
                  </span></td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">Sharing</th>
                  <td></td>
                  <td><span className="align-middle fs-3 text-success material-symbols-outlined">
                    check
                  </span></td>
                  <td><span className="align-middle fs-3 text-success material-symbols-outlined">
                    check
                  </span></td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">Unlimited members</th>
                  <td></td>
                  <td><span className="align-middle fs-3 text-success material-symbols-outlined">
                    check
                  </span></td>
                  <td><span className="align-middle fs-3 text-success material-symbols-outlined">
                    check
                  </span></td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">Extra security</th>
                  <td></td>
                  <td></td>
                  <td><span className="align-middle fs-3 text-success material-symbols-outlined">
                    check
                  </span></td>
                </tr>
              </tbody>
            </table>
          </div>
    );
}
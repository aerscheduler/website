export default function CollapseDefault({groupId,collapseId,collapseText,collapseHeading}) {
    return (
        <>
            <div className="accordion" id='collapseGroup'>
                {/* Collapse accordion item */}
                <div className="accordion-item">
                    <h5 className="card-header border-bottom-0" role="button" data-bs-toggle="collapse" aria-expanded="true" data-bs-target='#collapseItem1'>
                        Collapse Heading 1
                    </h5>
                    <div id='collapseItem1' className="accordion-collapse collapse show" data-bs-parent='#collapseGroup'>
                        <div className="card-body border-top text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                </div>
                {/* Collapse accordion item */}
                <div className="accordion-item">
                    <h5 className="card-header border-bottom-0" role="button" data-bs-toggle="collapse" aria-expanded="false" data-bs-target='#collapseItem2'>
                        Collapse Heading 2
                    </h5>
                    <div id='collapseItem2' className="accordion-collapse collapse" data-bs-parent='#collapseGroup'>
                        <div className="card-body border-top text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                </div>
                {/* Collapse accordion item */}
                <div className="accordion-item">
                    <h5 className="card-header border-bottom-0" role="button" data-bs-toggle="collapse" aria-expanded="false" data-bs-target='#collapseItem3'>
                        Collapse Heading 3
                    </h5>
                    <div id='collapseItem3' className="accordion-collapse collapse" data-bs-parent='#collapseGroup'>
                        <div className="card-body border-top text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";
export default function Typography() {
    return (
        <>
            <PageHeaderDefault pageTitle="Typography" breadcrumbActive="Typography" />

            <div className="container pb-9 pb-lg-11 position-relative mt-n12">
                <div className="card border-0 shadow mb-4 mb-lg-5">
                    <div className="card-header py-3 px-4">
                        <h5 className="card-title mb-0">Display headings</h5>
                    </div>
                    <div className="card-body p-4">
                        <h2 className="display-1">Display 1</h2>
                        <h2 className="display-2">Display 2</h2>
                        <h2 className="display-3">Display 3</h2>
                        <h2 className="display-4">Display 4</h2>
                        <h2 className="display-5">Display 5</h2>
                        <h2 className="display-6">Display 6</h2>
                    </div>
                </div>
                <div className="card border-0 shadow mb-4 mb-lg-5">
                    <div className="card-header py-3 px-4">
                        <h5 className="card-title mb-0">Headings</h5>
                    </div>
                    <div className="card-body p-4">
                        <h1>h1. Bootstrap heading</h1>
                        <h2>h2. Bootstrap heading</h2>
                        <h3>h3. Bootstrap heading</h3>
                        <h4>h4. Bootstrap heading</h4>
                        <h5>h5. Bootstrap heading</h5>
                        <h6>h6. Bootstrap heading</h6>
                    </div>
                </div>
                <div className="card border-0 shadow mb-4 mb-lg-5">
                    <div className="card-header py-3 px-4">
                        <h5 className="card-title mb-0">Inline text elements</h5>
                    </div>
                    <div className="card-body p-4">
                        <p>You can use the mark tag to <mark>highlight</mark> text.</p>
                        <p><del>This line of text is meant to be treated as deleted text.</del></p>
                        <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
                        <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
                        <p><u>This line of text will render as underlined.</u></p>
                        <p><small>This line of text is meant to be treated as fine print.</small></p>
                        <p><strong>This line rendered as bold text.</strong></p>
                        <p><em>This line rendered as italicized text.</em></p>
                    </div>
                </div>

                <div className="card border-0 shadow mb-4 mb-lg-5">
                    <div className="card-header py-3 px-4">
                        <h5 className="card-title mb-0">Blockquotes </h5>
                    </div>
                    <div className="card-body p-4">
                        <figure className="mb-0 border-start border-4 border-primary ps-4">
                            <blockquote className="blockquote">
                                <p>A well-known quote, contained in a blockquote element.</p>
                            </blockquote>
                            <figcaption className="blockquote-footer mb-0">
                                Someone famous in <cite title="Source Title">Source Title</cite>
                            </figcaption>
                        </figure>
                    </div>
                </div>
                <div className="card border-0 shadow mb-4 mb-lg-5">
                    <div className="card-header py-3 px-4">
                        <h5 className="card-title mb-0">Description list alignment</h5>
                    </div>
                    <div className="card-body p-4">
                    <dl className="row">
  <dt className="col-sm-3">Description lists</dt>
  <dd className="col-sm-9">A description list is perfect for defining terms.</dd>

  <dt className="col-sm-3">Term</dt>
  <dd className="col-sm-9">
    <p>Definition for the term.</p>
    <p>And some more placeholder definition text.</p>
  </dd>

  <dt className="col-sm-3">Another term</dt>
  <dd className="col-sm-9">This definition is short, so no extra paragraphs or anything.</dd>

  <dt className="col-sm-3 text-truncate">Truncated term is truncated</dt>
  <dd className="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>

  <dt className="col-sm-3">Nesting</dt>
  <dd className="col-sm-9">
    <dl className="row">
      <dt className="col-sm-4">Nested definition list</dt>
      <dd className="col-sm-8">I heard you like definition lists. Let me put a definition list inside your definition list.</dd>
    </dl>
  </dd>
</dl>
                    </div>
                </div>
                <div className="pt-5">
                    <a href="https://getbootstrap.com/docs/5.2/content/typography/" target="_blank" rel="noreferrer">Learn more about typography</a>
                </div>
            </div>
        </>
    );
}
Typography.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
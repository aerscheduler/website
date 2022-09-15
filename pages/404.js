import Layout from "@layouts/LayoutDefault"

export default function Custom404() {
    return <div className="container pt-12 pb-9 pt-lg-15 pb-lg-12 text-center">
      <span className="material-symbols-rounded text-warning fs-1 align-middle d-block mb-4 fw-normal">
pest_control
</span>
        <h1 className="mb-4 display-2">404</h1>
        <h4 className="mb-0">The page you&apos;re looking for is not found!</h4>
    </div>
  }
  Custom404.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }
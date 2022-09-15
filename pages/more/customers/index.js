
import CustomerStoryCard from "@components/customers/CustomerStoryCard";
import PageHeaderDefault from "@components/page-headers/PageHeaderDefault";
import Layout from "@layouts/LayoutDefault";
import useSWR from 'swr';
export default function Customers() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR('/api/stories', fetcher);

  if (error) return <div>Some went wrong with users data!</div>;
  if (!data) return <div className="vh-100 d-flex align-items-center justify-content-center">loading...</div>;
  return (
    <>
    <PageHeaderDefault pageTitle="Customer stories" breadcrumbActive="Customers" />

      <div className="container mt-n12 pb-9 pb-lg-11 position-relative">
        <div className="row">
        {data.map((customer) => (
                <CustomerStoryCard customer={customer} key={customer.id} />
            ))}
        </div>
        <div className="text-center pt-5">
          <a href="#" className="btn btn-secondary">More stories <span className="material-symbols-rounded align-middle ms-1">more_horiz</span></a>
        </div>
      </div>
    </>
  );
}
Customers.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
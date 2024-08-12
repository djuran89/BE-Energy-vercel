import Head from "next/head";
import Datatable from "../../components/layout/datatable";
import Layout from "../../components/layout";

export default function Company({ lang }) {
	return (
		<>
			<Head>
				<title>Company</title>
			</Head>

			<Datatable table="company" lang={lang} />
		</>
	);
}

Company.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

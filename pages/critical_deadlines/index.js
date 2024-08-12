import Head from "next/head";
import Datatable from "../../components/layout/datatable";
import Layout from "../../components/layout";

export default function CriticalDeadlines({ lang }) {
	return (
		<>
			<Head>
				<title>Project</title>
			</Head>

			<Datatable table="critical_deadlines" lang={lang} />
		</>
	);
}


CriticalDeadlines.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

import Head from "next/head";
import Datatable from "../../components/layout/datatable";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import { getSchema } from "../../utilities/schema";
import { getTabs } from "../../utilities/tab";

export default function Project({ lang }) {
	return (
		<>
			<Head>
				<title>Project</title>
			</Head>

			<Datatable table="project" lang={lang} />
		</>
	);
}

Project.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

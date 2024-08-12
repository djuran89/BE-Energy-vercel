import Head from "next/head";

import Layout from "./../components/layout";

export default function Home() {
	return (
		<>
			<Head>
				<title>Home Page</title>
				<meta name="description" content="Welcome to my home page" />
			</Head>

			<div className="flex justify-center items-center flex-col  w-full h-full">
				<div className="text-2xl">Welcome to home page</div>
				<div className="text-lg">BE Energy BASE</div>
			</div>
		</>
	);
}

Home.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

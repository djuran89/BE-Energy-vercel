import Head from "next/head";
import axios from "axios";
import Toastify from "../components/layout/toastify";
import { showError, showSuccess } from "@/components/notifications";

import "@/styles/globals.scss";
import { useEffect, useState } from "react";

// AXIOS CONFIG
axios.defaults.baseURL = process.env.NODE_ENV !== "development" ? "https://be-base.azurewebsites.net/api" : `http://localhost:4000/api`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
	(res) => {
		return res.data;
	},
	(err) => {
		if (err.response?.data) {
			throw new Error(err.response.data);
		} else {
			throw new Error("Something went wrong");
		}
	}
);

function MyApp({ Component, pageProps }) {
	const [lang, setLang] = useState("en");
	pageProps = { ...pageProps, lang };

	useEffect(() => {
		setLang(localStorage.getItem("lang") || "en");
	}, []);

	const getLayout = Component.getLayout || ((page) => page);

	return getLayout(
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
			</Head>
			<Component {...pageProps} />

			<Toastify />
		</>
	);
}

export default MyApp;

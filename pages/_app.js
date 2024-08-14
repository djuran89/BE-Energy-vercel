import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Head from "next/head";
import Toastify from "../components/layout/toastify";
import theme from "../utilities/theme";

import { Button } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

import "@/styles/globals.scss";

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
axios.interceptors.request.use(
	async (config) => {
		const user_id = await getuserId();
		console.log(user_id);
		config.headers.user_id = "development";
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);
	const [lang, setLang] = useState("en");
	pageProps = { ...pageProps, lang };

	// Get Language from LocalStorage
	useEffect(() => {
		setLang(localStorage.getItem("lang") || "en");
	}, []);

	const handleChangeLang = (e) => {
		const value = e.target.value;
		setLang(value);
		localStorage.setItem("lang", value);
		window.location.reload();
	};

	return getLayout(
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
			</Head>
			<ThemeProvider theme={theme}>
				<header className="bg-black text-white justify-between h-[64px] flex z-10 fixed w-screen items-center px-4">
					<nav className="flex items-center gap-4">
						<Link href="/">
							<img className="h-[54px] mr-4" src="/logo.svg" />
						</Link>
						<Link href="/project">
							<Button color="secondary" size="small" variant="contained">
								Project
							</Button>
						</Link>
						<Link href="/company">
							<Button color="secondary" size="small" variant="contained">
								Company
							</Button>
						</Link>
						<Link href="/critical_deadlines">
							<Button color="secondary" size="small" variant="contained">
								Critical Deadlines
							</Button>
						</Link>
					</nav>
					<div className="flex pr-4">
						<div>
							<select value={lang} onChange={handleChangeLang} className="text-black">
								<option value={"en"}>English</option>
								<option value={"de"}>Germany</option>
							</select>
						</div>
					</div>
				</header>
				<main className="h-rest w-full pt-[64px]">
					<Component {...pageProps} />
				</main>
			</ThemeProvider>

			<Toastify />
		</>
	);
}

async function getuserId() {
	try {
		if (process.env.NODE_ENV === "development") return "development";

		const res = await fetch("/.auth/me");
		const data = await res.json();
		console.log(data);
		return data;
	} catch (e) {
		console.log(e);
	}
}

export default MyApp;

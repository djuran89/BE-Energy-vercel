import Link from "next/link";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateNewBtn } from "./buttons";

function Layout({ children }) {
	const [lang, setLang] = useState("en");

	useEffect(() => {
		setLang(localStorage.getItem("lang") || "en");
	}, []);

	const handleChangeLang = (e) => {
		const value = e.target.value;
		setLang(value);
		localStorage.setItem("lang", value);
		window.location.reload();
	};
	return children;
	return (
		<>
			{/* <header className="bg-black text-white justify-between h-[64px] flex z-10 fixed w-screen items-center px-4">
				<div className="flex items-center">
					<Link href="/">
						<img className="h-[54px] mr-4" src="/logo.svg" />
					</Link>
					<nav className="flex gap-4">
						<Button color="secondary" size="small" variant="contained" href="/project">
							Project
						</Button>
						<Button size="small" color="primary" variant="contained">
							Company
						</Button>
						<Button color="secondary" size="small" variant="contained" href="/critical_deadlines">
							Critical Deadlines
						</Button>
					</nav>
				</div>
				<div className="flex">
					<div>
						<select value={lang} onChange={handleChangeLang} className="text-black">
							<option value={"en"}>English</option>
							<option value={"de"}>Germany</option>
						</select>
					</div>
				</div>
			</header>
			<main className="h-rest w-full pt-[64px]">{children}</main> */}
		</>
	);
}

const ButtonLink = ({ href, children }) => (
	<Link href={href} className="bg-primary hover:bg-yellow-500 text-black px-4 py-2 rounded">
		{children}
	</Link>
);

export default Layout;

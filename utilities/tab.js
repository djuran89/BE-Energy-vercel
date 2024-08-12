const tabs = [
	{
		page: "project",
		en: [
			"Overview",
			"Details",
			"Location",
			"Assets",
			"Grid Connection",
			"Responsibilities",
			"Substation",
			"Obligations",
			"Documents",
			"System",
			"History",
		],
		de: [
			"Übersicht",
			"Details",
			"Standort",
			"Anlagen",
			"Netzanschluss",
			"Zuständigkeiten",
			"Umspannwerk",
			"Auflagen",
			"Dokumente",
			"System",
			"Verlauf",
		],
	},
	{
		page: "company",
		en: ["Overview", "System", "History"],
		de: ["Übersicht", "System", "Verlauf"],
	},
	{
		page: "critical_deadlines",
		en: ["Overview", "System", "History"],
		de: ["Übersicht", "System", "Verlauf"],
	},
];

export function getTabs(page, lang) {
	const findTab = tabs.find((tab) => tab.page === page);

	if (!findTab) return [];

	const translateTabs = findTab[lang];
	if (!translateTabs) return [];

	return translateTabs;
}

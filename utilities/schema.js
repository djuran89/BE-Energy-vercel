const schema = [
	{
		schemaName: "project",
		schema: [
			{
				name: {
					en: "Name",
					de: "",
				},
				key: "name",
				type: "input",
				tab: 0,
				required: true,
				display: true,
			},
			{
				name: {
					en: "Technology",
					de: "",
				},
				key: "technology_id",
				link: "technology",
				type: "enum",
				tab: 0,
				display: true,
			},
			{
				name: {
					en: "Priority",
					de: "",
				},
				key: "priority_id",
				link: "priority",
				type: "enum",
				tab: 0,
				display: true,
			},
			{
				name: {
					en: "Critical Deadlines",
					de: "",
				},
				key: "critical_deadlines",
				link: "critical_deadlines",
				type: "table",
				tab: 0,
				display: false,
			},
			{
				name: {
					en: "Description",
					de: "Projektbeschreibung",
				},
				key: "description",
				type: "text",
				tab: 0,
				display: true,
			},
			{
				name: {
					en: "Current Steps",
					de: "Aktueller Schritt",
				},
				key: "current_step",
				link: "current_step",
				type: "table",
				tab: 0,
				display: false,
			},
			{
				name: {
					en: "Grid connection secured",
					de: "Netzanschluss gesichert",
				},
				key: "grid_connection_secured",
				type: "nummber",
				decimal: 2,
				tab: 4,
				display: true,
			},
			{
				name: {
					en: "Grid connection secured unit",
					de: "",
				},
				key: "grid_connection_secured_unit_id",
				link: "unit",
				type: "enum",
				tab: 4,
			},
			{
				name: {
					en: "Grid connection status",
					de: "",
				},
				key: "grid_connection_status_id",
				link: "grid_connection_status",
				type: "enum",
				tab: 4,
			},
			{
				name: {
					en: "Grid connection date",
					de: "Netzanschluss (Datum)",
				},
				key: "grid_connection_date",
				type: "date",
				tab: 4,
			},
			{
				name: {
					en: "Grid connection comment",
					de: "Netzanschluss Kommentar",
				},
				key: "grid_connection_comment",
				type: "text",
				tab: 4,
			},
			{
				name: {
					en: "Planned zoning ",
					de: "Geplante Zonierung",
				},
				key: "planned_zoning",
				type: "date",
				tab: 4,
			},
			{
				name: {
					en: "Planned Notice",
					de: "Geplanter Bescheid",
				},
				key: "planned_notice",
				type: "date",
				tab: 4,
			},
			{
				name: {
					en: "Legally binding",
					de: "Rechtskräftig",
				},
				key: "notice_legally_binding",
				type: "date",
				tab: 4,
			},
			{
				name: {
					en: "Commissioning",
					de: "Geplante Inbetriebnahme (GJ)",
				},
				key: "planned_commissioning_quartal",
				type: "nummber",
				decimal: 0,
				tab: 4,
			},
			{
				name: {
					en: "",
					de: "",
				},
				key: "planned_commissioning_year",
				type: "nummber",
				decimal: 0,
				tab: 4,
			},
			{
				name: {
					en: "Company",
					de: "Firma",
				},
				key: "company_id",
				type: "search",
				search: "company",
				link: "company",
				tab: 5,
			},
			{
				name: {
					en: "SPV",
					de: "SPV",
				},
				key: "spv",
				type: "boolean",
				tab: 5,
			},
			{
				name: {
					en: "Cooperation partner",
					de: "Kooperationspartner",
				},
				key: "cooperation_partner",
				type: "boolean",
				tab: 5,
			},
			{
				name: {
					en: "Cooperation contract",
					de: "Kooperationsvertrag",
				},
				key: "cooperation_contract",
				type: "text",
				tab: 8,
			},
			{
				name: {
					en: "Account BEE",
					de: "Kontierung BEE",
				},
				key: "account_no_bee",
				type: "nummber",
				decimal: 0,
				tab: 1,
			},
			{
				name: {
					en: "Account WindPv operation",
					de: "Kontierung WindPV Operation",
				},
				key: "account_wind_pv_operation",
				type: "nummber",
				decimal: 0,
				tab: 1,
			},
			{
				name: {
					en: "District",
					de: "Bezirk",
				},
				key: "district_id",
				type: "search",
				link: "district",
				tab: 2,
			},
			{
				name: {
					en: "Repowering",
					de: "Repowering",
				},
				key: "repowering",
				type: "boolean",
				tab: 1,
			},
			{
				name: {
					en: "Hybrid",
					de: "Hybrid",
				},
				key: "hybrid",
				type: "boolean",
				tab: 1,
			},
			{
				name: {
					en: "ESPOO",
					de: "ESPOO",
				},
				key: "espoo",
				type: "boolean",
				tab: 3,
			},
			{
				name: {
					en: "UNESCO",
					de: "UNESCO",
				},
				key: "unesco",
				type: "boolean",
				tab: 3,
			},
			{
				name: {
					en: "Forest",
					de: "Wald",
				},
				key: "forest",
				type: "boolean",
				tab: 3,
			},
			{
				name: {
					en: "Agri-PV Obligation",
					de: "Agri-PV Auflage",
				},
				key: "pv_agri_obligation",
				type: "boolean",
				tab: 3,
			},
			{
				name: {
					en: "Number WEC",
					de: "Anzahl WEA",
				},
				key: "wec_number",
				type: "nummber",
				decimal: 1,
				tab: 3,
			},
			{
				name: {
					en: "Number WEC BE Energy",
					de: "Anzahl WEA BE Energy",
				},
				key: "wec_number_be_energy",
				type: "nummber",
				decimal: 1,
				tab: 3,
			},
			{
				name: {
					en: "MWp [PV]",
					de: "MWp [PV]",
				},
				key: "pv_mw_peak",
				type: "nummber",
				decimal: 2,
				tab: 3,
			},
			{
				name: {
					en: "MW BE Energy",
					de: "MW BE Energy",
				},
				key: "mw_be_energy",
				type: "nummber",
				decimal: 2,
				tab: 3,
			},
			{
				name: {
					en: "MW Netzrelevant",
					de: "MW Netzrelavant",
				},
				key: "mw_grid_relevant",
				type: "nummber",
				decimal: 2,
				tab: 3,
			},
			{
				name: {
					en: "MW Grid Relevant Unit",
					de: "",
				},
				key: "mw_grid_relevant_unit_id",
				type: "enum",
				link: "mw_grid_relevant_unit",
				tab: 3,
			},
			{
				name: {
					en: "Share",
					de: "Anteil",
				},
				key: "share",
				type: "nummber",
				decimal: 2,
				tab: 3,
			},
			{
				name: {
					en: "Hybrid feed in WF [PV]",
					de: "Hybrid EinspeiseWP [PV]",
				},
				key: "pv_hybrid_feed_in_windfarm",
				type: "boolean",
				tab: 6,
			},
			{
				name: {
					en: "Property (# Total)",
					de: "Grundstücke (Gesamtanzahl)",
				},
				key: "property_no_total",
				type: "nummber",
				decimal: 0,
				tab: 2,
			},
			{
				name: {
					en: "Property (# Total) / Comment",
					de: "Grundstücke (Gesamtanzahl) / Anmerkung",
				},
				key: "property_no_total_note",
				type: "text",
				tab: 2,
			},
			{
				name: {
					en: "Properties Secured",
					de: "Grundstücke gesichert",
				},
				key: "properties_secured",
				type: "nummber",
				decimal: 2,
				tab: 2,
			},
			{
				name: {
					en: "Properties Secured",
					de: "Grundstücke gesichert",
				},
				key: "properties_secured_unit_id",
				type: "enum",
				link: "properties_secured_unit",
				tab: 2,
			},
			{
				name: {
					en: "Project Area",
					de: "Projektfläche",
				},
				key: "project_area",
				type: "nummber",
				decimal: 2,
				tab: 2,
			},
			{
				name: {
					en: "Project Area Unit",
					de: "",
				},
				key: "project_area_unit_id",
				type: "enum",
				link: "project_area_unit",
				tab: 2,
			},
			{
				name: {
					en: "Legal Support Company",
					de: "Rechtliche Begleitung",
				},
				key: "legal_support_company_id",
				type: "search",
				link: "legal_support_company",
				search: "company",
				tab: 5,
			},
			{
				name: {
					en: "Legal support",
					de: "",
				},
				key: "legal_support_contact_id",
				link: "legal_support_contact",
				type: "search",
				search: "contact",
				tab: 5,
			},
			{
				name: {
					en: "Project manager",
					de: "Projektleiter-Kooperationpartner",
				},
				key: "project_manager_contact_id",
				link: "project_manager_contact",
				type: "search",
				search: "contact",
				tab: 5,
			},
			{
				name: {
					en: "Planer submitter company",
					de: "Planer Einreichoperat",
				},
				key: "planer_submitter_company_id",
				link: "planer_submitter_company",
				type: "search",
				search: "company",
				tab: 5,
			},
			{
				name: {
					en: "Planer submitter",
					de: "",
				},
				key: "planer_submitter_contact_id",
				link: "planer_submitter_contact",
				type: "search",
				search: "contact",
				tab: 5,
			},
			{
				name: {
					en: "Nature study company",
					de: "Naturuntersuchungen",
				},
				key: "nature_study_company_id",
				link: "nature_study_company",
				type: "search",
				search: "company",
				tab: 5,
			},
			{
				name: {
					en: "Nature study contact",
					de: "",
				},
				key: "nature_study_contact_id",
				link: "nature_study_contact",
				type: "search",
				search: "contact",
				tab: 5,
			},
			{
				name: {
					en: "Responsible PE",
					de: "Zuständig PE",
				},
				key: "responsible_pe_contact_id",
				link: "responsible_pe_contact",
				type: "search",
				search: "contact",
				tab: 5,
			},
			{
				name: {
					en: "Responsible PE",
					de: "Zuständig PA",
				},
				key: "responsible_pa_contact_id",
				link: "responsible_pa_contact",
				type: "search",
				search: "contact",
				tab: 5,
			},
			{
				name: {
					en: "Responsible SB",
					de: "Zuständig SB",
				},
				key: "responsible_sb_contact_id",
				link: "responsible_sb_contact",
				type: "search",
				search: "contact",
				tab: 5,
			},
			{
				name: {
					en: "AR Application",
					de: "AR Antrag",
				},
				key: "ar_application",
				type: "boolean",
				tab: 5,
			},
			{
				name: {
					en: "File path",
					de: "Ablageordner",
				},
				key: "file_path",
				type: "text",
				tab: 8,
			},
			{
				name: {
					en: "East",
					de: "Ost",
				},
				key: "coordinate_east",
				type: "nummber",
				decimal: 6,
				tab: 2,
			},
			{
				name: {
					en: "Nord",
					de: "Nord",
				},
				key: "coordinate_nord",
				type: "nummber",
				decimal: 6,
				tab: 2,
			},
			{
				name: {
					en: "Coordinate notes",
					de: "Anm. Koordinaten",
				},
				key: "coordinate_notes",
				type: "text",
				decimal: 6,
				tab: 2,
			},
			{
				name: {
					en: "Created At",
					de: "",
				},
				key: "createdAt",
				type: "date",
				edit: false,
				tab: 9,
			},
			{
				name: {
					en: "Updated At",
					de: "",
				},
				key: "updatedAt",
				type: "date",
				edit: false,
				tab: 9,
			},
			{
				name: {
					en: "Created By",
					de: "",
				},
				key: "created_by",
				type: "input",
				edit: false,
				tab: 9,
			},
			{
				name: {
					en: "Updated By",
					de: "",
				},
				key: "updated_by",
				type: "input",
				edit: false,
				tab: 9,
			},
		],
	},
	{
		schemaName: "critical_deadlines",
		schema: [
			{
				name: {
					en: "Name",
					de: "",
				},
				key: "name",
				type: "input",
				tab: 0,
				required: true,
				display: true,
			},
			{
				name: {
					en: "Description",
					de: "",
				},
				key: "description",
				type: "input",
				tab: 0,
				display: true,
			},
			{
				name: {
					en: "Project",
					de: "",
				},
				key: "project_id",
				link: "project",
				search: "project",
				type: "search",
				tab: 0,
				display: true,
			},
		],
	},
	{
		schemaName: "company",
		schema: [
			{
				name: {
					en: "Name",
					de: "",
				},
				key: "name",
				type: "input",
				tab: 0,
				required: true,
				display: true,
			},
		],
	},

	// {
	// 	schemaName: "",
	// 	schema: [],
	// },
];

export const getSchema = (table, lang = "en", onlyDisplay = false) => {
	if (!table) return [];
	const findSchema = schema.find((s) => s.schemaName === table)?.schema || [];

	if (findSchema.length === 0) return [];

	const translateName = findSchema.map((field) => {
		const displayName = field.name[lang];
		if (displayName === "") {
			return { ...field, name: "Translation not found" };
		}

		return { ...field, name: displayName };
	});

	if (onlyDisplay) return translateName.filter((field) => field.display);

	return translateName;
};

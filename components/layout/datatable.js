import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid, GridCsvExportMenuItem, GridToolbarContainer, GridToolbarExportContainer } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { showError } from "../notifications";
import { formatDatetime, getType, pluralize, formatLabel } from "../../utilities/helper";
import RightPanel from "./right-panel";
import { CreateNewBtn } from "./buttons";
import { getSchema } from "../../utilities/schema";
import { getTabs } from "../../utilities/tab";

// Export CSV options
const csvOptions = { delimiter: ";" };

export default function Datatable(props) {
	const { table, lang } = props;
	const [loading, setLoading] = useState(true);
	const [rows, setRows] = useState([]);
	const [enumerators, setEnumerators] = useState({});

	const [showRightPanel, setShowRightPanel] = useState(false);
	const [rightPanelData, setRightPanelData] = useState({});

	const schema = getSchema(table, lang, true);
	const tabs = getTabs(table, lang);
	const columns = getColumesFromSchema(table, schema, enumerators);
	// console.log("schema", schema);

	// Get data for rows the table
	useEffect(() => {
		if (!table) return showError("Table name is required");
		if (schema.length === 0) return;

		axios
			.get(`/${table}`)
			.then((res) => {
				setEnumerators(res.enumerators);
				setRows(res.data);
				setLoading(false);
			})
			.catch((err) => showError(err));
	}, []);

	// Custom toolbar
	const CustomToolbar = (props) => (
		<div className="flex items-center justify-between px-4 py-2 border-b-[1px]">
			<div className="text-lg">{formatLabel(table, true)}</div>
			<GridToolbarContainer {...props}>
				<CreateNewBtn onClick={handleOnCreateNew} />
				<ExportButton porps={props} />
			</GridToolbarContainer>
		</div>
	);

	// Click handlers
	// Handler function for double-click events
	const handleRowDoubleClick = (params) => {
		setRightPanelData(params.row);
		setShowRightPanel(true);
	};

	// Handler function for creating new records
	const handleOnCreateNew = () => {
		setShowRightPanel(true);
	};

	return (
		<div className="bg-white p-4">
			{loading && <Loading />}
			{showRightPanel && (
				<RightPanel
					rightPanelData={rightPanelData}
					setRightPanelData={setRightPanelData}
					table={table}
					schema={schema}
					setShow={setShowRightPanel}
					setRows={setRows}
					enumerators={enumerators}
					tabs={tabs}
					lang={lang}
				/>
			)}
			<div className="rounded-md border-primary border-t-4">
				<DataGrid
					rows={rows}
					columns={columns}
					slots={{ toolbar: CustomToolbar }}
					sortModel={[{ field: "id", sort: "desc" }]}
					onRowDoubleClick={handleRowDoubleClick}
				/>
			</div>
		</div>
	);
}

const getColumesFromSchema = (table, schema, enumerators) => {
	schema = schema.map((column) => {
		let { name: headerName, key: field, type, link, required, width } = column;
		width = width || 200;

		const defaultColume = { field, headerName, width };
		if (type === "input") {
			if (field === "name") {
				return { ...defaultColume, flex: 1 };
			}
			return defaultColume;
		}

		if (type === "enum") {
			const enumerator = enumerators[link];
			return {
				...defaultColume,
				valueFormatter: (value) => {
					if (enumerator.length === 0) return "";
					if (value === null) return "";
					if (value === undefined) return "";
					const findEnumerator = enumerator.find((e) => e.id === value);
					if (!findEnumerator) return "Enum not found";
					return findEnumerator.name;
				},
			};
		}

		if (type === "search") {
			return {
				...defaultColume,
				valueFormatter: (value, data) => {
					if (value === null) return "";
					if (value === undefined) return "";
					if (!data[link]) return "";

					return data[link].name || "";
				},
			};
		}

		return { ...defaultColume };
	});

	schema.unshift({
		field: "id",
		headerName: "Id",
		width: 80,
	});

	schema.push({
		field: "created_by",
		headerName: "Created By",
		width: 150,
	});

	schema.push({
		field: "updated_by",
		headerName: "Updated By",
		width: 150,
	});

	schema.push({
		field: "createdAt",
		headerName: "Created At",
		width: 160,
		valueFormatter: (value) => formatDatetime(value),
	});

	schema.push({
		field: "updatedAt",
		headerName: "Updated At",
		width: 160,
		valueFormatter: (value) => formatDatetime(value),
	});

	return schema;
};

const ExportButton = (props) => (
	<GridToolbarExportContainer {...props}>
		<GridCsvExportMenuItem options={csvOptions} />
	</GridToolbarExportContainer>
);

// const getColumesFromSchema = (table, schema, enumerators) => {
// 	schema = schema.filter((column) => {
// 		const { column_name, constraint_name } = column;
// 		// if (column_name.includes("_id")) {
// 		// 	const foreignKey = column_name.replace("_id", "");
// 		// 	if (foreignKey === table) return false;
// 		// }
// 		// If Foreign key is the primary key for other table
// 		// if (constraint_name) {
// 		// 	if (constraint_name.includes("fkey") && column_name === "id") return false;
// 		// }

// 		return true;
// 	});

// 	schema = schema.map((column) => {
// 		let minWidth = 0;
// 		const { column_name, constraint_column_name, data_type } = column;
// 		const type = getType(data_type);

// 		// Check if the column is an id
// 		if (column_name === "id") {
// 			return {
// 				field: column_name,
// 				headerName: "Id",
// 				type: data_type,
// 				width: 80,
// 			};
// 		}

// 		// Check if the column is a date
// 		if (type === "date") {
// 			return {
// 				field: column_name,
// 				headerName: formatLabel(column_name),
// 				type: data_type,
// 				width: 160,
// 				valueFormatter: (value) => formatDatetime(value),
// 			};
// 		}

// 		// Check if the column is an enumerator
// 		if (constraint_column_name) {
// 			const foreignKey = constraint_column_name.replace("_id", "");
// 			const enumerator = enumerators[foreignKey];
// 			if (enumerator) {
// 				return {
// 					field: column_name,
// 					headerName: formatLabel(column_name),
// 					type: data_type,
// 					width: 150,
// 					valueFormatter: (value) => {
// 						if (value === null) return "";
// 						if (value === undefined) return "";
// 						const findEnumerator = enumerator.find((e) => e.id === value);
// 						if (!findEnumerator) return "Enum not found";
// 						return findEnumerator.name;
// 					},
// 				};
// 			} else {
// 				return {
// 					field: column_name,
// 					headerName: formatLabel(column_name),
// 					type: data_type,
// 					width: 150,
// 					valueFormatter: (value, data) => {
// 						if (value === null) return "";
// 						if (value === undefined) return "";
// 						if (!data[foreignKey]) return "";

// 						return data[foreignKey].name || "";
// 					},
// 				};
// 			}
// 		}

// 		// Set column width
// 		if (column_name === "created_by" || column_name === "updated_by") minWidth = 150;

// 		// Default
// 		return {
// 			field: column_name,
// 			headerName: formatLabel(column_name),
// 			type: data_type,
// 			flex: minWidth > 0 ? 0 : 1,
// 			minWidth,
// 		};
// 	});

// 	return schema;
// };

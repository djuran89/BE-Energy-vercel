import { useEffect, useState } from "react";
import { formatLabel } from "../../utilities/helper";
import { CloseBtn, SaveBtn, AddBtn } from "./buttons";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { getSchema } from "../../utilities/schema";

function ListPanel({ table, onClose, data, setData }) {
	const schema = getSchema(table);

	const [rows, setRows] = useState([]);
	const [columns, setColumns] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	// Get data for rows the table
	useEffect(() => {
		axios
			.get(`/${table}/no-relations`)
			.then((res) => {
				const keys = getColumesFromSchema(table, schema, res, res.enumerators || {});
				setColumns(keys);
				setRows(res);
				setSelectedRows(data.map((el) => el.id));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSelectionChange = (newSelection) => setSelectedRows(newSelection);

	const handleOnSave = async () => {
		const findData = rows.filter((row) => selectedRows.includes(row.id));
		setData(findData);
		onClose();
	};

	return (
		<div className="flex flex-col fixed z-20 w-screen h-screen bg-white top-0 left-0 border-t-2 border-t-primary">
			<div className="flex w-full justify-between items-center h-[64px] px-4 border-b-[1px] border-gray-300">
				<span>Select {formatLabel(table)}</span>
				<div>
					{/* <SaveBtn onClick={handleOnSave} /> */}
					<CloseBtn onClick={onClose} />
				</div>
			</div>
			<div className="flex px-4 items-center h-[48px]">
				<AddBtn onClick={handleOnSave} />
			</div>
			<div>
				<DataGrid
					rows={rows}
					columns={columns}
					rowSelectionModel={selectedRows}
					onRowSelectionModelChange={handleSelectionChange}
					checkboxSelection
				/>
			</div>
		</div>
	);
}

const getColumesFromSchema = (table, schema, data, enumerators) => {
	schema = schema
		.filter((el) => el.type === "input")
		.map((field) => {
			const { name, key, type, link, tab, search: searchBy, required } = field;
			if (type === "input") {
				return {
					field: key,
					headerName: name,
					type: "string",
					width: 200,
				};
			}
		});

	schema.unshift({
		field: "id",
		headerName: "Id",
		type: "string",
		width: 80,
	});

	return schema;
};

const findSelectedData = (allData, selectedData) => {
	console.log(allData, selectedData);
	const retVal = [];
	for (const i in allData) {
		if (selectedData.find((data) => data.id === allData[i].id)) {
			retVal.push(i);
		}
	}
	return retVal;
};

export default ListPanel;

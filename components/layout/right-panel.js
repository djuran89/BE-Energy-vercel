import { Search as SearchIcon } from "@mui/icons-material";
import { FormControl, IconButton, Input, InputLabel, Menu, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

import { Add as AddIcon, ArrowBackIos as ArrowLeft, ArrowForwardIos as ArrowRight, DoneAll as CheckIcon } from "@mui/icons-material";
import { formatDatetime, formatLabel, isDate, isEmpty } from "../../utilities/helper";
import { getSchema } from "../../utilities/schema";
import { getTabs } from "../../utilities/tab";
import { showError } from "../notifications";
import { ClearBtn, CloseBtn, EditBtn, SaveBtn } from "./buttons";
import ListPanel from "./list-panel";

export default function RightPanel({ table, lang, rightPanelData, onClose, handleCreate, handleUpdate, enumerators }) {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);
	const [selectedTab, setSelectedTab] = useState(0);
	const isCreate = rightPanelData.id ? false : true;
	const [isDisabled, setIsDisabled] = useState(!isCreate);
	const tabMap = getSchema(table, lang);
	const tabs = getTabs(table, lang);

	// Get the data for the record
	useEffect(() => {
		if (isCreate) return;
		axios
			.get(`/${table}/${rightPanelData.id}`)
			.then((res) => setData(res))
			.catch((err) => showError(err));
	}, []);

	// Prevent scrolling when modal is open
	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => (document.body.style.overflow = "auto");
	}, []);

	// Click handlers
	// Save the record
	const handleSave = async (e) => {
		// Validate form
		const form = document.getElementById("table-form");
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}

		// Disable the save button
		setLoading(true);

		// Save the record
		isCreate ? await handleCreate(data) : await handleUpdate(data);
		setLoading(false);
		handleClose();
	};

	// Close the modal
	const handleClose = () => {
		setData({});
		onClose();
	};

	const handleLeftScroll = () => {
		const tabScroll = document.getElementById("tab-scroll");
		tabScroll.scrollLeft -= 200;
	};

	const handleRightScroll = () => {
		const tabScroll = document.getElementById("tab-scroll");
		tabScroll.scrollLeft += 200;
	};

	return (
		<div className="fixed flex flex-col top-0 left-0 z-50 w-screen h-screen bg-white border-t-4 border-primary">
			{/* Header */}
			<div className="flex items-center border-b-[1px] px-4 border-gray-200 justify-between h-[64px] min-h-[64px]">
				{/* Title */}
				<div className="">
					<div className="text-xs font-light text-gray-500">
						{!isCreate ? `${formatLabel(table.toUpperCase(), false) + " #" + data?.id || ""}` : `NEW ${formatLabel(table, false).toUpperCase()}`}
					</div>
				</div>
				{/* Toolbar */}
				<div className="flex items-center justify-center gap-1">
					{isDisabled ? <EditBtn onClick={() => setIsDisabled(false)} /> : <SaveBtn onClick={handleSave} loading={loading} />}
					{/* <ArrowRightBtn /> */}
					<CloseBtn onClick={handleClose} />
				</div>
			</div>

			{/* Tabs */}
			<div className="flex h-[48px] min-h-[48px] w-full items-center px-4 border-b-[1px] border-gray-200">
				<ArrowLeft sx={{ fontSize: 16, cursor: "pointer" }} onClick={handleLeftScroll} />

				<div id="tab-scroll" className="overflow-x-hidden flex-1 h-full flex gap-4">
					{tabs.map((tab, i) => (
						<div
							onClick={() => setSelectedTab(i)}
							key={i}
							id={`tab-${i}`}
							className={`flex whitespace-nowrap w-full h-full cursor-pointer items-center justify-center px-6 ${
								i === selectedTab ? "border-b-2 border-primary" : ""
							}`}
						>
							{tab}
						</div>
					))}
				</div>

				<ArrowRight sx={{ fontSize: 16, cursor: "pointer" }} onClick={handleRightScroll} />
			</div>

			{/* Body */}
			<form id="table-form" className="flex flex-wrap py-4 overflow-y-auto pb-[16px]">
				{tabMap.map((field, i) => {
					const type = field.type;

					if (type === "input") return <InputField key={i} field={field} data={data} setData={setData} isDisabled={isDisabled} selectedTab={selectedTab} />;

					if (type === "text") return <TextareaField key={i} field={field} data={data} setData={setData} isDisabled={isDisabled} selectedTab={selectedTab} />;

					if (type === "boolean")
						return <BooleanField key={i} field={field} data={data} setData={setData} isDisabled={isDisabled} selectedTab={selectedTab} lang={lang} />;

					if (type === "date") return <DateField key={i} field={field} data={data} setData={setData} isDisabled={isDisabled} selectedTab={selectedTab} />;

					if (type === "nummber") return <NummberField key={i} field={field} data={data} setData={setData} isDisabled={isDisabled} selectedTab={selectedTab} />;

					if (type === "search") return <InputSearch key={i} field={field} data={data} setData={setData} isDisabled={isDisabled} selectedTab={selectedTab} />;

					if (type === "enum")
						return <InputEnum key={i} enumerators={enumerators} field={field} data={data} setData={setData} isDisabled={isDisabled} selectedTab={selectedTab} />;

					if (type === "table") return <TableField key={i} index={i} field={field} data={data} setData={setData} isDisabled={isDisabled} selectedTab={selectedTab} />;
				})}
			</form>
		</div>
	);
}

const InputField = ({ field, data, setData, isDisabled, selectedTab }) => {
	const { name, key, type, edit, link, tab, required } = field;

	return (
		<WrapperTab tab={tab} selectedTab={selectedTab}>
			<FormControl variant="standard">
				<InputLabel>
					{name} {required ? "*" : ""}
				</InputLabel>
				<Input
					value={data[key] || ""}
					onChange={(e) => setData({ ...data, [key]: e.target.value })}
					required={required}
					disabled={edit === false ? true : isDisabled}
					autoComplete="off"
				/>
			</FormControl>
		</WrapperTab>
	);
};

const NummberField = ({ field, data, setData, isDisabled, selectedTab }) => {
	const { name, decimal, key, type, link, tab, required } = field;

	const onChange = (e) => {
		const decimalValue = e.target.value.split(".")[1];
		if (decimalValue) {
			if (decimalValue.length > decimal) return;
		}
		setData({ ...data, [key]: e.target.value });
	};

	return (
		<WrapperTab tab={tab} selectedTab={selectedTab}>
			<FormControl variant="standard">
				<InputLabel>
					{name} {required ? "*" : ""}
				</InputLabel>
				<Input value={data[key] || ""} onChange={onChange} required={required} disabled={isDisabled} type="number" />
			</FormControl>
		</WrapperTab>
	);
};

const BooleanField = ({ field, data, setData, isDisabled, selectedTab, lang }) => {
	const { name, key, type, link, tab, required } = field;

	return (
		<WrapperTab tab={tab} selectedTab={selectedTab}>
			<FormControl variant="standard">
				{data[key] !== null && (
					<ClearBtn
						className={`absolute cursor-pointer ${isDisabled ? "text-gray-300" : "text-gray-700"} right-[30px] bottom-[8px] z-10`}
						onClick={() => !isDisabled && setData({ ...data, [key]: null })}
					/>
				)}
				<InputLabel>
					{name} {required ? "*" : ""}
				</InputLabel>
				<Select value={data[key] === null ? "" : data[key]} onChange={(e) => setData({ ...data, [key]: e.target.value })} disabled={isDisabled}>
					<MenuItem value={true}>{lang === "en" ? "True" : "Ja"}</MenuItem>
					<MenuItem value={false}>{lang === "en" ? "False" : "Nein"}</MenuItem>
				</Select>
			</FormControl>
		</WrapperTab>
	);
};

const DateField = ({ field, data, setData, isDisabled, selectedTab }) => {
	const { name, key, edit, link, tab, required } = field;

	const handleDateChange = (e) => setData({ ...data, [key]: e });

	return (
		<WrapperTab tab={tab} selectedTab={selectedTab}>
			<FormControl variant="standard">
				<LocalizationProvider dateAdapter={AdapterMoment}>
					<DateTimePicker
						format="DD.MM.YYYY hh:mm:ss"
						label={name}
						value={data[key] ? moment(data[key]) : null}
						onChange={handleDateChange}
						slotProps={{ textField: { variant: "standard" } }}
						disabled={edit === false ? true : isDisabled}
					/>
				</LocalizationProvider>
			</FormControl>
		</WrapperTab>
	);
};

const TextareaField = ({ field, data, setData, isDisabled, selectedTab }) => {
	const { name, key, type, link, tab, required } = field;

	return (
		<WrapperTabFull tab={tab} selectedTab={selectedTab}>
			<FormControl variant="standard">
				<TextField
					value={data[key] || ""}
					onChange={(e) => setData({ ...data, [key]: e.target.value })}
					required={required}
					disabled={isDisabled}
					multiline
					rows={3}
					fullWidth
					label={name}
				/>
			</FormControl>
		</WrapperTabFull>
	);
};

const InputEnum = ({ enumerators, field, data, setData, isDisabled, selectedTab }) => {
	const { name, key, type, link, tab, required } = field;

	const enumerator = enumerators[link];
	return (
		<WrapperTab tab={tab} selectedTab={selectedTab}>
			<FormControl variant="standard">
				{data[key] && (
					<ClearBtn
						className={`absolute cursor-pointer ${isDisabled ? "text-gray-300" : "text-gray-700"} right-[30px] bottom-[8px] z-10`}
						onClick={() => !isDisabled && setData({ ...data, [key]: null })}
					/>
				)}
				<InputLabel>{name}</InputLabel>
				<Select value={data[key] || ""} onChange={(e) => setData({ ...data, [key]: e.target.value })} disabled={isDisabled}>
					{/* No recourds in database */}
					{enumerator ? (
						enumerator.length === 0 && (
							<MenuItem value="">
								<em>No data for enumerator</em>
							</MenuItem>
						)
					) : (
						<MenuItem value="">
							<em>Enumerators not found for {link}!</em>
						</MenuItem>
					)}
					{/* Render enumerators items */}
					{enumerator &&
						enumerator.map((item, i) => (
							<MenuItem key={i} value={item.id}>
								{item.name}
							</MenuItem>
						))}
				</Select>
			</FormControl>
		</WrapperTab>
	);
};

const TableField = ({ field, index, data, setData, isDisabled, selectedTab }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [createNew, setCreateNew] = useState(false);
	const open = Boolean(anchorEl);

	const { name, key, type, link, tab, required } = field;
	const [showList, setShowList] = useState(false);

	const preoloadData = data[key];

	let keys = [];
	if (data[key]) {
		if (data[key].length > 0) {
			keys = Object.keys(data[key][0]).filter((el) => el.includes("_id") === false);
		}
	}

	const handleClose = () => setAnchorEl(null);
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleSelect = () => setShowList(true);
	const handleCloseListPanel = () => setShowList(false);

	const onSetNewData = (newData) => {
		setData({ ...data, ...data[key], [key]: newData });
	};

	return (
		<>
			{createNew && <RightPanel table={link} rightPanelData={{}} handleCreate={handleCreate} setShow={() => setCreateNew(false)} />}
			{showList && <ListPanel table={link} onClose={handleCloseListPanel} data={preoloadData} setData={onSetNewData} />}
			<WrapperTabFull tab={tab} selectedTab={selectedTab}>
				<div className="border-[1px] border-gray-300 border-t-4 border-t-primary">
					<div className="flex justify-between items-center px-4 py-2 border-b-[1px] h-[52px] border-gray-300">
						<div>{name}</div>
						{!isDisabled && (
							<div>
								<IconButton
									size="small"
									color="primary"
									onClick={handleClick}
									aria-haspopup="true"
									aria-controls={open ? "dropdown-menu" : undefined}
									aria-expanded={open ? "true" : undefined}
								>
									<AddIcon />
								</IconButton>
								<Menu
									anchorEl={anchorEl}
									id="dropdown-menu"
									open={open}
									onClose={handleClose}
									onClick={handleClose}
									transformOrigin={{ horizontal: "right", vertical: "top" }}
									anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
								>
									{/* <MenuItem onClick={() => setCreateNew(true)} className="flex gap-4 items-center">
										<AddIcon />
										<span>Crete new {formatLabel(link)}</span>
									</MenuItem> */}
									<MenuItem onClick={handleSelect} className="flex gap-4 items-center">
										<CheckIcon />
										<span>Select {formatLabel(link)}</span>
									</MenuItem>
								</Menu>
							</div>
						)}
					</div>
					<div className="max-h-[216px] min-h-[216px] overflow-y-auto">
						{keys.length === 0 && preoloadData && <div className="flex justify-center min-h-[180px] max-h-[215px] items-center w-full h-full">No data</div>}
						<FormControl variant="standard" className="w-full">
							<Table>
								<TableHead style={{ position: "sticky", left: 0, top: 0, background: "#fff" }}>
									<TableRow>
										{data[key] &&
											keys.map((k, i) => {
												return <TableCell key={`th-${index}-${i}`}>{formatLabel(k)}</TableCell>;
											})}
									</TableRow>
								</TableHead>
								{data[key] &&
									data[key].length > 0 &&
									data[key].map((item, i) => {
										return (
											<TableBody key={`td-${index}-${i}`}>
												<TableRow>
													{keys.map((k, i) => (
														<TableCell key={i}>{isDate(item[k]) ? formatDatetime(item[k]) : item[k]}</TableCell>
													))}
												</TableRow>
											</TableBody>
										);
									})}
							</Table>
						</FormControl>
					</div>
				</div>
			</WrapperTabFull>
		</>
	);
};

const InputSearch = ({ field, data, setData, isDisabled, selectedTab }) => {
	const { name, key, type, link, tab, search: searchBy, required } = field;

	const minChars = 3;
	const value = data[key];
	const [search, setSearch] = useState(value?.name || "");
	const [results, setResults] = useState(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const firstLoad = useRef(false);

	// Get the data for the record
	useEffect(() => {
		if (!search) return;
		if (search.length < minChars) return;

		setLoading(true);
		axios
			.get(`/search/${searchBy}?search=${search}&column="name"`)
			.then((res) => {
				setResults(res);
				setShowDropdown(true);
				setLoading(false);
			})
			.catch((err) => showError(err));
	}, [search]);

	// Set the input value
	useEffect(() => {
		if (isEmpty(data)) return;
		// Load the data only once
		if (firstLoad.current) return;
		if (!firstLoad.current) firstLoad.current = true;

		// Get the foreign key
		const findItem = data[link];
		if (!findItem) return;
		setInputValue(findItem.name);
	}, [data]);

	// If innput lost focus
	const handleBlur = () => {
		setTimeout(() => {
			setShowDropdown(false);
			setResults(null);
		}, 200);
	};

	const handleFocus = () => {
		// if (search.length > 0) setShowDropdown(true);
	};

	const handleSelectItem = (e) => {
		const name = e.target.innerText;
		const findItem = results.find((item) => item.name === name);
		if (!findItem) return;
		setData({ ...data, [key]: findItem.id });
		setInputValue(name);
		setShowDropdown(false);
		setResults(null);
	};

	const handleClear = () => {
		!isDisabled && setData({ ...data, [key]: null });
		setInputValue("");
	};

	const Item = ({ name }) => (
		<div onClick={handleSelectItem} className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
			{name}
		</div>
	);

	return (
		<WrapperTab tab={tab} selectedTab={selectedTab}>
			<FormControl variant="standard" className="relative" style={{ position: "relative" }}>
				<div className={`flex items-center absolute ${isDisabled ? "text-gray-300" : "text-gray-700"} z-10 right-[4px] bottom-[8px] gap-4`}>
					{data[key] && <ClearBtn onClick={handleClear} />}

					<Tooltip title={`Search by: ${formatLabel(searchBy, false)}`}>
						<SearchIcon />
					</Tooltip>
				</div>

				<InputLabel>{name}</InputLabel>
				<Input
					value={inputValue}
					onChange={(e) => (setInputValue(e.target.value), setSearch(e.target.value))}
					onBlur={handleBlur}
					onFocus={handleFocus}
					disabled={isDisabled}
				/>
				{showDropdown && results && results.length > 0 ? (
					<div className="absolute z-20 w-full max-h-[200px] overflow-y-scroll bg-white border top-[46px] shadow-lg rounded-xl  left-0 border-gray-200 mt-1">
						{results.map((item, i) => (
							<Item key={i} name={item.name} />
						))}
					</div>
				) : (
					showDropdown && !results && <Item name={`Minimum ${minChars} characters`} />
				)}
				{loading && (
					<div className="absolute top-0 right-0 bottom-0 left-0 bg-white bg-opacity-50 z-20">
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<div className="w-6 h-6 border-2 border-primary rounded-full animate-spin"></div>
						</div>
					</div>
				)}
				{results && results.length === 0 && search.length > minChars && (
					<div className="absolute z-20 w-full max-h-[200px] overflow-y-scroll bg-white border top-[46px] shadow-lg rounded-xl  left-0 border-gray-200 mt-1">
						<Item name="No results found" style={{ cursor: "not-allowed" }} />
					</div>
				)}
			</FormControl>

			<Input style={{ display: "none" }} value={data[key] || ""} onChange={(e) => setData({ ...data, [key]: e.target.value })} />
		</WrapperTab>
	);
};

const WrapperTab = ({ children, tab, selectedTab }) => {
	if (tab !== selectedTab) return null;
	return <div className="flex w-1/2 flex-col px-4 py-2">{children}</div>;
};

const WrapperTabFull = ({ children, tab, selectedTab }) => {
	if (tab !== selectedTab) return null;
	return <div className="flex w-full flex-col px-4 py-2">{children}</div>;
};

const SearchAPI = ({ index, tab, selectedTab, data, setData, table, column_name, isDisabled }) => {
	const minChars = 3;
	const foreign_key = column_name.replace("_id", "");
	const value = data[foreign_key];
	const [search, setSearch] = useState(value?.name || "");
	const [results, setResults] = useState(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const firstLoad = useRef(false);

	// Get the data for the record
	useEffect(() => {
		if (!search) return;
		if (search.length < minChars) return;

		setLoading(true);
		axios
			.get(`/search/${table}?search=${search}&column="name"`)
			.then((res) => {
				setResults(res);
				setShowDropdown(true);
				setLoading(false);
			})
			.catch((err) => showError(err));
	}, [search]);

	// Set the input value
	useEffect(() => {
		if (isEmpty(data)) return;
		// Load the data only once
		if (firstLoad.current) return;
		if (!firstLoad.current) firstLoad.current = true;

		// Get the foreign key
		const foreign_key = column_name.replace("_id", "");
		const findItem = data[foreign_key];
		if (!findItem) return;
		setInputValue(findItem.name);
	}, [data]);

	// If innput lost focus
	const handleBlur = () => {
		setTimeout(() => {
			setShowDropdown(false);
			setResults(null);
		}, 200);
	};

	const handleFocus = () => {
		// if (search.length > 0) setShowDropdown(true);
	};

	const handleSelectItem = (e) => {
		const name = e.target.innerText;
		const findItem = results.find((item) => item.name === name);
		setData({ ...data, [column_name]: findItem.id });
		setInputValue(name);
		setShowDropdown(false);
		setResults(null);
	};

	const Item = ({ name }) => (
		<div onClick={handleSelectItem} className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
			{name}
		</div>
	);

	return (
		<WrapperTab tab={tab} selectedTab={selectedTab}>
			<FormControl variant="standard" className="relative" style={{ position: "relative" }}>
				<InputLabel htmlFor={`input-${index}`} className="label-table">
					{formatLabel(column_name)}
				</InputLabel>
				<Input
					id={`input-${index}`}
					value={inputValue}
					onChange={(e) => (setInputValue(e.target.value), setSearch(e.target.value))}
					onBlur={handleBlur}
					onFocus={handleFocus}
					disabled={isDisabled}
				/>
				{showDropdown && results && results.length > 0 ? (
					<div className="absolute w-full max-h-[200px] overflow-y-scroll bg-white border top-[46px] shadow-lg rounded-xl  left-0 border-gray-200 mt-1">
						{results.map((item, i) => (
							<Item key={i} name={item.name} />
						))}
					</div>
				) : (
					showDropdown && !results && <Item name={`Minimum ${minChars} characters`} />
				)}
				{loading && (
					<div className="absolute top-0 right-0 bottom-0 left-0 bg-white bg-opacity-50 z-10">
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<div className="w-6 h-6 border-2 border-primary rounded-full animate-spin"></div>
						</div>
					</div>
				)}
				{results && results.length === 0 && search.length > minChars && <Item name="No results found" style={{ cursor: "not-allowed" }} />}
			</FormControl>

			<Input style={{ display: "none" }} value={data[column_name] || ""} onChange={(e) => setData({ ...data, [column_name]: e.target.value })} />
		</WrapperTab>
	);
};

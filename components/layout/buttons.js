import { Save as SaveIcon, KeyboardDoubleArrowRight as ArrowRightIcon, Close as CloseIcon, Add as AddIcon, Edit as EditIcon, Backspace as ClearIcon } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Tooltip, IconButton } from "@mui/material";

export const SaveBtn = ({ onClick, loading }) => (
	<LoadingButton color="primary" size="small" onClick={onClick} loading={loading} loadingPosition="start" startIcon={<SaveIcon />} variant="contained">
		<span>Save</span>
	</LoadingButton>
);

export const AddBtn = ({ onClick, loading }) => (
	<Button size="small" color="primary" variant="contained" onClick={onClick}>
		<AddIcon />
		ADD
	</Button>
);

export const SaveIconBtn = ({ onClick }) => (
	<Tooltip title="Save">
		<IconButton color="primary" onClick={onClick}>
			<SaveIcon />
		</IconButton>
	</Tooltip>
);

export const EditBtn = ({ onClick, loading }) => (
	<Tooltip title="Edit">
		<IconButton color="primary" onClick={onClick}>
			<EditIcon />
		</IconButton>
	</Tooltip>
);

export const ArrowRightBtn = ({ onClick }) => (
	<IconButton color="primary" onClick={onClick}>
		<ArrowRightIcon />
	</IconButton>
);

export const CloseBtn = ({ onClick }) => (
	<Tooltip title="Close">
		<IconButton color="primary" onClick={onClick}>
			<CloseIcon />
		</IconButton>
	</Tooltip>
);

export const CreateNewBtn = ({ onClick }) => (
	<Button size="small" color="primary" onClick={onClick}>
		<AddIcon />
		Create new
	</Button>
);

export const ClearBtn = ({ onClick, className }) => <ClearIcon fontSize="14" className={className} onClick={onClick} />;

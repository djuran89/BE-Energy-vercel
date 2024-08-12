import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = "colored";
const configtToast = {
	isLoading: false,
	position: "top-right",
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme,
};
export function showError(err, toastId) {
	const message = err.response?.data?.msg || err.message || err;
	const statusCode = err.response?.status;

	if (toastId) {
		toast.update(toastId, {
			render: message,
			type: "error",
			...configtToast,
		});
	} else {
		toast.error(message);
	}
}

export function showSuccess(msg, toastId) {
	if (toastId) {
		toast.update(toastId, {
			render: msg,
			type: "success",
			...configtToast,
		});
	} else {
		toast.success(msg);
	}
}
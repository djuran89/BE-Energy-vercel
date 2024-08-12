import { ToastContainer } from "react-toastify";

const Toastify = () => {
	return (
		<ToastContainer
			position="top-right"
			autoClose={3000}
			hideProgressBar={false}
			newestOnTop
			// limit={3}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss={false}
			draggable
			pauseOnHover
			theme="colored"
            stacked
		/>
	);
};

export default Toastify;

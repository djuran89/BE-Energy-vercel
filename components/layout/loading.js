function Loading() {
	return (
		<>
			<div className="fixed top-[64px] left-0 z-50 w-screen h-rest bg-black opacity-50 flex justify-center items-center"></div>
			<div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center">
				<div className="flex items-center justify-center h-64">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
				</div>
			</div>
		</>
	);
}

export default Loading;

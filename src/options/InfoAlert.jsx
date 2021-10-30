import { Alert, Snackbar } from "@mui/material";

const InfoAlert = ({ snackbarInfo, setSnackbarInfo }) => {
	const closeSnackbar = () => {
		setSnackbarInfo({
			...snackbarInfo,
			isOpen: false,
		});
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={snackbarInfo.isOpen}
			autoHideDuration={3000}
			onClose={() => closeSnackbar()}
		>
			<Alert onClose={() => closeSnackbar()} severity={snackbarInfo.severity}>
				{snackbarInfo.message}
			</Alert>
		</Snackbar>
	);
};

export default InfoAlert;

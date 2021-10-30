import {
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

const ShowUsers = ({ allUsers, setEditUser, setPageNo, getAllUsersData }) => {
	const copyToClipboard = (value) => {
		navigator.clipboard.writeText(value);
	};

	return (
		<div style={{ marginLeft: "20%" }}>
			<Typography
				variant="h3"
				component="div"
				style={{ textAlign: "center", margin: "15px" }}
			>
				Show Users
			</Typography>
			{allUsers?.length ? (
				<div id="all-users" style={{ width: "100%" }}>
					<center>
						<Button
							style={{ margin: "10px" }}
							variant="contained"
							onClick={() => getAllUsersData()}
						>
							Refresh
						</Button>
					</center>
					<TableContainer component={Paper}>
						<Table sx={{}} aria-label="all user table">
							<TableHead>
								<TableRow>
									<TableCell>Index</TableCell>
									<TableCell align="center">First Name</TableCell>
									<TableCell align="center">Last Name</TableCell>
									<TableCell align="center">Email</TableCell>
									<TableCell align="center">Token</TableCell>
									<TableCell align="center">Status</TableCell>
									<TableCell align="center">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allUsers.map((user, index) => (
									<TableRow key={"user" + index}>
										<TableCell>{index + 1}</TableCell>
										<TableCell align="center">{user.first_name}</TableCell>
										<TableCell align="center">{user.last_name}</TableCell>
										<TableCell align="center">{user.email}</TableCell>
										<TableCell align="center">
											<IconButton onClick={() => copyToClipboard(user.token)}>
												<img src="copy.png" alt="copy" width="20" />
											</IconButton>
										</TableCell>
										<TableCell align="center">
											{user.is_active ? "Active" : "Deactive"}
										</TableCell>
										<TableCell align="center">
											<IconButton
												color="primary"
												aria-label="Edit user"
												component="span"
												onClick={() => {
													setEditUser(user);
													setPageNo(0);
												}}
											>
												<img src="edit.png" alt="edit" width={20} />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			) : (
				<Typography
					variant="h5"
					component="div"
					style={{ textAlign: "center", margin: "70px" }}
				>
					No Users
				</Typography>
			)}
		</div>
	);
};

export default ShowUsers;

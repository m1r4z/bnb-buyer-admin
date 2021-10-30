import {
	Alert,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ADD_USER, EDIT_USER } from "../common/constant";

const AddUser = ({ editUser, setEditUser, handleAddOrEditUser, setSnackbarInfo }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState(null);
	const [isEditUser, setIsEditUser] = useState(null);

	const handleAddUser = () => {
		if (!firstName || !lastName || !email || status === null) {
			setSnackbarInfo({
				message: "All info required!!",
				severity: "error",
				isOpen: true,
			});
			return;
		}

		if (
			email.match(
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/g
			)?.[0]
		) {
			handleAddOrEditUser(ADD_USER, {
				user: {
					first_name: firstName,
					last_name: lastName,
					email: email,
					is_active: status,
				},
			});
		} else {
			setSnackbarInfo({
				message: "Email is not valid!!",
				severity: "error",
				isOpen: true,
			});
		}
	};
	const handleEditUser = () => {
		if (!firstName || !lastName || !email || status === null) {
			setSnackbarInfo({
				message: "All info required!!",
				severity: "error",
				isOpen: true,
			});
			return;
		}
		if (
			email.match(
				/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/g
			)?.[0]
		) {
			handleAddOrEditUser(EDIT_USER, {
				user_id: isEditUser.user_id,
				user: {
					first_name: firstName,
					last_name: lastName,
					email: email,
					is_active: status,
				},
			});
		} else {
			setSnackbarInfo({
				message: "Email is not valid!!",
				severity: "error",
				isOpen: true,
			});
		}
	};

	useEffect(() => {
		if (editUser) {
			setFirstName(editUser.first_name);
			setLastName(editUser.last_name);
			setEmail(editUser.email);
			setStatus(editUser.is_active);
			setIsEditUser(editUser);
			setEditUser(null);
		}
	}, [editUser]);

	return (
		<div id="adduser" style={{ marginLeft: "20%" }}>
			<center>
				<Typography
					variant="h3"
					component="div"
					style={{ textAlign: "center", margin: "15px" }}
				>
					Add User
				</Typography>
				<div style={{ margin: "15px" }}>
					<Alert severity="info" style={{ width: "400px" }}>
						Email must be unique and all field must be filled!!
					</Alert>
				</div>
				<div style={{ margin: "10px" }}>
					<TextField
						id="adduser-firstname"
						label="First Name"
						variant="outlined"
						style={{ width: "300px" }}
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div style={{ margin: "10px" }}>
					<TextField
						id="adduser-lastname"
						label="Last Name"
						variant="outlined"
						value={lastName}
						style={{ width: "300px" }}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div style={{ margin: "10px" }}>
					<TextField
						id="adduser-email"
						label="Email"
						variant="outlined"
						value={email}
						style={{ width: "300px" }}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div style={{ margin: "10px" }}>
					<FormControl style={{ width: "300px" }}>
						<InputLabel id="adduser-select-label">Status</InputLabel>
						<Select
							labelId="adduser-select-label"
							id="adduser-select"
							value={status ?? ""}
							label="Status"
							onChange={(e) => setStatus(e.target.value)}
						>
							<MenuItem value={1}>Active</MenuItem>
							<MenuItem value={0}>Deactive</MenuItem>
						</Select>
					</FormControl>
				</div>
				{isEditUser ? (
					<Button variant="contained" onClick={handleEditUser}>
						Edit User
					</Button>
				) : (
					<Button variant="contained" onClick={handleAddUser}>
						Add User
					</Button>
				)}
			</center>
		</div>
	);
};

export default AddUser;

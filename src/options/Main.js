import { useEffect, useState } from "react";
import {
	ADD_USER,
	EXTENSION_MESSAGE_ADD_USER,
	EXTENSION_MESSAGE_EDIT_USER,
	EXTENSION_MESSAGE_GET_ALL_USERS,
	STORAGE_KEY_ALL_USER_DATA,
} from "../common/constant";
import { addStorageChangeListener, getDataFromStorage } from "../common/storageUtils";
import AddUser from "./AddUser";
import InfoAlert from "./InfoAlert";
import ShowUsers from "./ShowUsers";
import Sidebar from "./Sidebar";

const Main = () => {
	const [pageNo, setPageNo] = useState(0);
	const [editUser, setEditUser] = useState(null);
	const [snackbarInfo, setSnackbarInfo] = useState({
		message: "",
		severity: "info",
		isOpen: false,
	});
	const [allUsers, setAllUsers] = useState([]);

	const getAllUsersData = () => {
		console.log("getAllUsersData");
		chrome.runtime.sendMessage({ query: EXTENSION_MESSAGE_GET_ALL_USERS });
	};

	useEffect(() => {
		getAllUsersData();

		addStorageChangeListener((changes, area) => {
			console.log(changes, area);
			if (area === "local" && changes[STORAGE_KEY_ALL_USER_DATA]?.newValue) {
				setAllUsers(changes[STORAGE_KEY_ALL_USER_DATA]?.newValue);
			}
		});

		getDataFromStorage(STORAGE_KEY_ALL_USER_DATA).then((storageData) => {
			setAllUsers(storageData);
		});
	}, []);

	const handleAddOrEditUser = (type, data) => {
		console.log(type, data);
		if (type === ADD_USER) {
			chrome.runtime.sendMessage(
				{
					query: EXTENSION_MESSAGE_ADD_USER,
					data,
				},
				(res) => {
					console.log(res);
					if (res.query === EXTENSION_MESSAGE_ADD_USER) {
						if (res.response.exception) {
							setSnackbarInfo({
								message: res.response.message,
								severity: "error",
								isOpen: true,
							});
						} else {
							setSnackbarInfo({
								message: "User Added!!",
								severity: "success",
								isOpen: true,
							});
						}
					}
				}
			);
		} else {
			chrome.runtime.sendMessage(
				{
					query: EXTENSION_MESSAGE_EDIT_USER,
					data,
				},
				(res) => {
					console.log(res);
					if (res.query === EXTENSION_MESSAGE_EDIT_USER) {
						if (res.response.exception) {
							setSnackbarInfo({
								message: "Error Exception!!",
								severity: "error",
								isOpen: true,
							});
						} else {
							setSnackbarInfo({
								message: "User Edited!!",
								severity: "success",
								isOpen: true,
							});
						}
					}
				}
			);
		}
	};

	return (
		<div className="main">
			{<Sidebar setPageNo={setPageNo} />}
			{pageNo === 0 && (
				<AddUser
					editUser={editUser}
					setEditUser={setEditUser}
					handleAddOrEditUser={handleAddOrEditUser}
					setSnackbarInfo={setSnackbarInfo}
				/>
			)}
			{pageNo === 1 && (
				<ShowUsers
					allUsers={allUsers}
					setEditUser={setEditUser}
					setPageNo={setPageNo}
					getAllUsersData={getAllUsersData}
				/>
			)}

			{<InfoAlert snackbarInfo={snackbarInfo} setSnackbarInfo={setSnackbarInfo} />}
		</div>
	);
};

export default Main;

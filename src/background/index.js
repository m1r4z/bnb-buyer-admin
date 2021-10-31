import {
	EXTENSION_MESSAGE_ADD_USER,
	EXTENSION_MESSAGE_EDIT_USER,
	EXTENSION_MESSAGE_GET_ALL_USERS,
	STORAGE_KEY_ALL_USER_DATA,
} from "../common/constant";
import { setDataInStorage } from "../common/storageUtils";

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
	console.log(request);
	if (request.query === EXTENSION_MESSAGE_ADD_USER) {
		fetch("http://137.184.138.100/api/user/addNewUser", {
			body: JSON.stringify(request.data),
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					return response.json();
				} else if (response.status === 410) {
					throw Error("Duplicate Email!!");
				} else {
					throw Error("Error exception");
				}
			})
			.then(
				(response) => {
					console.log(response);
					sendMessage({ query: request.query, response });
				},
				(err) => {
					console.log(err);
					sendMessage({
						query: request.query,
						response: { exception: "410", message: err.message },
					});
				}
			);
	} else if (request.query === EXTENSION_MESSAGE_EDIT_USER) {
		fetch("http://137.184.138.100/api/user/updateUser", {
			body: JSON.stringify(request.data),
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				sendMessage({ query: request.query, response });
			});
	} else if (request.query === EXTENSION_MESSAGE_GET_ALL_USERS) {
		fetch("http://137.184.138.100/api/user/getAllUser")
			.then((response) => response.json())
			.then((response) => {
				setDataInStorage(response, STORAGE_KEY_ALL_USER_DATA);
			});
	}
	return true;
});

chrome.browserAction.setPopup({ popup: "" });
chrome.browserAction.onClicked.addListener((tab) => {
	chrome.runtime.openOptionsPage();
});

import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";

const Sidebar = ({ setPageNo }) => {
	const handleOnSidebarItemClick = (pageNo) => {
		setPageNo(pageNo);
	};

	return (
		<div id="sidebar">
			<Drawer
				anchor="left"
				variant="permanent"
				open={true}
				PaperProps={{
					style: { width: "20%" },
					component: "div",
					variant: "outlined",
				}}
			>
				<List>
					<ListItem>
						<ListItemText
							primary={
								<Typography
									variant="h5"
									component="div"
									style={{ textAlign: "center" }}
								>
									Bnb Buyer Admin
								</Typography>
							}
						/>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={() => handleOnSidebarItemClick(0)}>
							<ListItemIcon>
								<img src="add.png" alt="" width={30} />
							</ListItemIcon>
							<ListItemText primary="Add / Edit user" />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={() => handleOnSidebarItemClick(1)}>
							<ListItemIcon>
								<img src="userlist.png" alt="" width={30} />
							</ListItemIcon>
							<ListItemText primary="Show Users" />
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
};

export default Sidebar;

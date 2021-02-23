import * as React from "react";
import {
    Box, Button, Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@material-ui/core";
import {User} from "../../model/User";
import LocalStorageService from "../../services/LocalStorageService";

type PageProps = {
    user: User
}

class ProfilePage extends React.Component<PageProps, any>{
    public render() {
        let user = this.props.user;
        let currentUser = LocalStorageService.getUser();

        let infoList: Array<{label: string, value?: any}> = [
            {label: "Username", value: user.username},
            {label: "First name", value: user.firstName},
            {label: "Last name", value: user.lastName},
            {label: "Status", value: user.status},
            {label: "Type", value: user.userType},
        ];

        if (user.userType === "student") {
            let level: string = "";
            switch (user.studentInfo?.level) {
                case "d":
                    level = "Bachelor's";
                    break;
                case "m":
                    level = "Master's";
                    break;
                case "p":
                    level = "Doctor's";
                    break;
            }

            infoList.push({label: "ID number", value: user.studentInfo?.idNumber});
            infoList.push({label: "Level", value: level});
        }

        if (user.userType === "employee") {
            infoList.push({label: "Title", value: user.employeeInfo?.title});
            infoList.push({label: "Address", value: user.employeeInfo?.address});
            infoList.push({label: "Phone number", value: user.employeeInfo?.phoneNumber});
            infoList.push({label: "Office number", value: user.employeeInfo?.officeNumber});
            infoList.push({label: "Web site", value: <a href={user.employeeInfo?.webSite}>{user.employeeInfo?.webSite}</a>});
            infoList.push({label: "Biography", value: user.employeeInfo?.biography});
        }

        return (
            <Box p={3} className="profile_page">
                <Paper elevation={5}>
                    <Box p={3}>
                        <Table size="small">
                            <TableBody>
                                {
                                    infoList.map(item =>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.label}:&nbsp;
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5" color="primary">
                                                    {item.value}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                        {
                            user.employeeInfo && user.id === currentUser?.id && <div>
                                <Button href="/edit-profile" variant="contained" fullWidth={true}>
                                    Edit profile
                                </Button>
                            </div>
                        }
                    </Box>
                </Paper>
            </Box>
        )
    }
}

export default ProfilePage;

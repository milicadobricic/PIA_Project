import * as React from "react";
import {
    Box, Button, Grid, Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@material-ui/core";
import {User} from "../../model/User";
import LocalStorageService from "../../services/LocalStorageService";
import DefaultPicture from "../../images/default.jpg"

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

        let gridSize : 4 | 12 = user.employeeInfo && user.id === currentUser?.id ? 4 : 12;

        return (
            <Box p={3} className="profile_page">
                <Paper elevation={5}>
                    <Box p={3}>
                        <Grid container direction="row">
                            <Grid item md={this.props.user.employeeInfo ? 8 : 12}>
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
                            </Grid>
                            {
                                this.props.user.employeeInfo &&
                                <Grid item md={4}>
                                    <div>
                                        <img alt="" className="profile_picture" src={user.employeeInfo?.profilePicture ?? DefaultPicture}/>
                                    </div>
                                </Grid>
                            }
                        </Grid>
                        <Grid container direction="row">
                            {
                                user.id === currentUser?.id && <Grid item md={gridSize}>
                                    <Button href="/update-password" variant="contained" fullWidth={true}>
                                        Update password
                                    </Button>
                                </Grid>
                            }
                            {
                                user.employeeInfo && user.id === currentUser?.id && <Grid item md={gridSize}>
                                        <Button href="/edit-profile" variant="contained" fullWidth={true}>
                                            Edit profile
                                        </Button>
                                    </Grid>
                            }
                            {
                                user.employeeInfo && user.id === currentUser?.id && <Grid item md={gridSize}>
                                    <Button href="/my-notifications" variant="contained" fullWidth={true}>
                                        My notifications
                                    </Button>
                                </Grid>
                            }
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        )
    }
}

export default ProfilePage;

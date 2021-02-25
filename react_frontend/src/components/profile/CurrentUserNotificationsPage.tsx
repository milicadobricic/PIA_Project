import * as React from "react";
import {Notification} from "../../model/Notification";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";
import {Box, IconButton, Paper, Typography} from "@material-ui/core";
import {AddCircleOutlined} from "@material-ui/icons";
import ClassNotifications from "../class/ClassNotifications";
import LocalStorageService from "../../services/LocalStorageService";

type PageState = {
    notifications?: Array<Notification>
}

class CurrentUserNotificationsPage extends React.Component<any, PageState>{
    public constructor(props: any) {
        super(props);

        this.state = {
            notifications: undefined
        }
    }

    public async componentDidMount() {
        await this.refresh();
    }

    public refresh = async () => {
        let groups = await ApiService.groups(LocalStorageService.getUser().id);
        let classes = groups.map(group => group.classId);
        let notifications: Array<Notification> = await ApiService.notifications(classes);
        this.setState({
            notifications
        });
    }

    public render() {
        if (!this.state.notifications) {
            return (
                <Alert severity="info">
                    <Typography>
                        Loading...
                    </Typography>
                </Alert>
            )
        }

        return(
            <div>
                <Box p={3} className="profile_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Typography variant="h3" align="center">
                                Notifications
                                <IconButton href="/create-notification">
                                    <AddCircleOutlined />
                                </IconButton>
                            </Typography>
                            <ClassNotifications notifications={this.state.notifications} onDelete={this.refresh} />
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default CurrentUserNotificationsPage;

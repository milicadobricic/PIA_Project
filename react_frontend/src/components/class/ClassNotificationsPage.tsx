import * as React from "react";
import {Notification} from "../../model/Notification";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";
import {Box, IconButton, Paper, Typography} from "@material-ui/core";
import ClassTabs from "./ClassTabs";
import {AddCircleOutlined} from "@material-ui/icons";
import ClassNotifications from "./ClassNotifications";

type PageState = {
    notifications?: Array<Notification>
}

class ClassNotificationsPage extends React.Component<any, PageState>{
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
        let classId = this.props.match.params.id;
        let notifications: Array<Notification> = await ApiService.notifications(classId);
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
                <Box p={3} className="class_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <ClassTabs index={1} classId={this.props.match.params.id} />
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

export default ClassNotificationsPage;

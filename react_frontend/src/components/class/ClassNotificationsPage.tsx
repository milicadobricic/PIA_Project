import * as React from "react";
import {Notification} from "../../model/Notification";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";
import {Box, Divider, Paper, Typography} from "@material-ui/core";

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
                {
                    this.state.notifications.map(notification =>
                        <Box p={3} className="profile_page">
                            <Paper elevation={5}>
                                <Box p={3}>
                                    <Typography variant="h5" align="center">
                                        {notification.title} ({notification.date})
                                    </Typography>
                                    <Divider />
                                    <Typography align="center">
                                        {notification.content}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    )
                }
            </div>
        )
    }
}

export default ClassNotificationsPage;

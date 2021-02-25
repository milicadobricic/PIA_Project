import * as React from "react";
import {Notification} from "../../model/Notification";
import {Box, Divider, Paper, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

type NotificationsProps = {
    notifications: Array<Notification>
}

class ClassNotifications extends React.Component<NotificationsProps, any> {
    public render() {
        return (
            <div>
                {
                    this.props.notifications.length === 0 && <Alert severity="info">
                        <Typography>
                            No notifications for this class
                        </Typography>
                    </Alert>
                }
                {
                    this.props.notifications.map(notification =>
                        <Box p={3} className="class_notification">
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

export default ClassNotifications;

import * as React from "react";
import {Notification} from "../../model/Notification";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    IconButton,
    Paper,
    Typography
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {Delete, Edit} from "@material-ui/icons";
import ApiService from "../../services/ApiService";

type NotificationsProps = {
    notifications: Array<Notification>,
    onDelete: (notification: Notification) => void
}

type NotificationsState = {
    notificationToDelete?: Notification,
}

class ClassNotifications extends React.Component<NotificationsProps, NotificationsState> {
    public constructor(props: NotificationsProps) {
        super(props);
        this.state = {
            notificationToDelete: undefined
        };
    }

    public onDelete = (notification: Notification) => {
        this.setState({
            notificationToDelete: notification
        });
    }

    public onDeleteConfirm = async () => {
        await ApiService.deleteNotification(this.state.notificationToDelete as Notification);
        this.props.onDelete(this.state.notificationToDelete as Notification);
    }

    public onDeleteCancel = () => {
        this.setState({
            notificationToDelete: undefined
        });
    }

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
                                        <IconButton href={"/edit-notification/" + notification.id}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => this.onDelete(notification)}>
                                            <Delete />
                                        </IconButton>
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
                <Dialog open={!!this.state.notificationToDelete} onClose={this.onDeleteCancel}>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to delete notification {this.state.notificationToDelete?.title}?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.onDeleteConfirm} color="primary">
                            Confirm
                        </Button>
                        <Button variant="contained" onClick={this.onDeleteCancel}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ClassNotifications;

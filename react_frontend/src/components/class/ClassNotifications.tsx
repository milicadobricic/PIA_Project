import * as React from "react";
import {Notification, NotificationFile} from "../../model/Notification";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    IconButton,
    Paper, Table, TableCell, TableRow,
    Typography
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {Delete, Edit, GetApp} from "@material-ui/icons";
import ApiService from "../../services/ApiService";
import LocalStorageService from "../../services/LocalStorageService";

type NotificationsProps = {
    notifications: Array<Notification>,
    onDelete: (notification: Notification) => void
}

type NotificationsState = {
    notificationToDelete?: Notification,
    classIds: Array<string>
}

class ClassNotifications extends React.Component<NotificationsProps, NotificationsState> {
    public constructor(props: NotificationsProps) {
        super(props);
        this.state = {
            notificationToDelete: undefined,
            classIds: []
        };
    }

    public async componentDidMount() {
        let groups = await ApiService.groups(LocalStorageService.getUser().id);
        let classIds = groups.map(group => group.classId);
        this.setState({
            classIds
        });
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

    public onDownloadFile = (file: NotificationFile) => {
        let content = atob(file.content);
        let blob = new Blob([content], {type: file.mimeType});
        let a = document.createElement('a');
        a.download = file.name;
        a.href = window.URL.createObjectURL(blob);
        a.textContent = "Download ready";
        a.hidden = true;
        a.click();
    }

    public isImportant(notification: Notification) {
        let now = new Date();
        let then = new Date(notification.date);

        let diff = now.getTime() - then.getTime();
        const threshold = 1000 * 60 * 60 * 24 * 7;
        return diff < threshold;
    }

    public render() {
        let userId = LocalStorageService.getUser().id;

        return (
            <div>
                {
                    this.props.notifications.length === 0 && <Alert severity="info">
                        <Typography>
                            No notifications
                        </Typography>
                    </Alert>
                }
                {
                    this.props.notifications.map(notification =>
                        <Box p={3} className="class_notification">
                            <Paper elevation={5}>
                                <Box p={3}>
                                    <Typography variant="h5" align="center" color={this.isImportant(notification) ? "primary" : "inherit"}>
                                        {notification.title} ({notification.date})
                                        {
                                            (notification.classes.some(classId => this.state.classIds.includes(classId)) || LocalStorageService.getUser().userType === "admin")
                                            &&
                                            <IconButton href={"/edit-notification/" + notification.id}>
                                                <Edit />
                                            </IconButton>
                                        }
                                        {
                                            (notification.userId === userId || LocalStorageService.getUser().userType === "admin") &&
                                            <IconButton onClick={() => this.onDelete(notification)}>
                                                <Delete />
                                            </IconButton>
                                        }
                                    </Typography>
                                    <Divider />
                                    <Typography align="center">
                                        {notification.content}
                                    </Typography>
                                    {notification.files && notification.files.length > 0 && <div>
                                        <Divider />
                                        <Table size="small">
                                            {notification.files.map(file => <TableRow>
                                                <TableCell>
                                                    <Typography align="center">
                                                        {file.name}
                                                        <IconButton onClick={() => this.onDownloadFile(file)}>
                                                            <GetApp />
                                                        </IconButton>
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>)}
                                        </Table>
                                    </div>}
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

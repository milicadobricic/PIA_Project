import * as React from "react";
import {Notification, NotificationFile} from "../../model/Notification";
import ApiService from "../../services/ApiService";
import {Button, IconButton, Table, TableBody, TableCell, TableRow, TextField, Typography,} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import Select from 'react-select';
import {Class} from "../../model/Class";
import LocalStorageService from "../../services/LocalStorageService";
import {AddCircleOutlined, Delete} from "@material-ui/icons";
import {Guid} from "guid-typescript";

type NotificationProps = {
    notification: Notification,
}

type NotificationState = {
    notification: Notification,
    classes?: Array<Class>,
    success: boolean,
    message?: string,
}

class AddUpdateNotification extends React.Component<NotificationProps, NotificationState> {
    public constructor(props: NotificationProps) {
        super(props);

        this.state = {
            notification: props.notification,
            classes: undefined,
            success: true,
            message: undefined,
        };
    }

    public async componentDidMount() {
        let classes: Array<Class> = await ApiService.classes();

        if(LocalStorageService.getUser().userType !== "admin") {
            let groups = await ApiService.groups(LocalStorageService.getUser().id);
            let classIds = groups.map(group => group.classId);
            classes = classes.filter(classInfo => classIds.includes(classInfo.id));
        }
        
        this.setState({
            notification: this.props.notification,
            classes
        });
    }

    public componentDidUpdate(prevProps: Readonly<NotificationProps>, prevState: Readonly<NotificationState>, snapshot?: any) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.setState({
                notification: this.props.notification
            });
        }
    }

    public onUpdate = (key: string, event: any) => {
        let notification = this.state.notification;

        // @ts-ignore
        notification[key] = event.target.value;
        this.setState({
            notification
        });
    }

    public onClassesUpdate = (selectedClasses: any) => {
        let notification = this.state.notification;
        notification.classes = selectedClasses.map((option: {label: string, value: string}) => option.value);

        this.setState({
            notification
        })
    };

    public onConfirm = async () => {
        let response = await ApiService.addUpdateNotification(this.state.notification);

        this.setState({
            success: response.success,
            message: response.message
        });
    }

    public onFinishedUpload = (event: any, fileName: string, mimeType: string) => {
        let content = event.target.result;
        let base64 = btoa(content);

        let file: NotificationFile = {
            id: Guid.create().toString(),
            name: fileName,
            content: base64,
            mimeType
        };

        let notification = this.state.notification;
        if (!notification.files) notification.files = [];
        notification.files.push(file);

        this.setState({
            notification
        });
    }

    public onAddFile = () => {
        let fileInputElement = document.getElementById("attachmentUpload") as HTMLInputElement;

        if(fileInputElement !== null && fileInputElement.files !== null) {
            if (fileInputElement.files[0]) {
                let file = fileInputElement.files[0];
                let reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = (event) => this.onFinishedUpload(event, file.name, file.type);
            }
        }
    }

    public onDeleteFile = (index: number) => {
        let notification = this.state.notification;
        notification.files?.splice(index, 1);
        this.setState({
            notification
        });
    }

    public render() {
        let classOptions: Array<{value: string, label: string}> = [];
        let chosenClasses: Array<{value: string, label: string}> = [];
        if(this.state.classes){
            classOptions = this.state.classes.map((classInfo: Class) => {
                return {
                    value: classInfo.id,
                    label: classInfo.name
                }
            });

            chosenClasses = this.state.classes.filter((classInfo: Class) => this.state.notification.classes.includes(classInfo.id)).map((classInfo: Class) => {
                return {
                    value: classInfo.id,
                    label: classInfo.name
                }
            });
        }

        return (
            <div>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    onChange={event => this.onUpdate("title", event)}
                                    fullWidth={true}
                                    variant="outlined"
                                    label="Title"
                                    value={this.state.notification.title}
                                    size="small"
                                    required
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    onChange={event => this.onUpdate("content", event)}
                                    fullWidth={true}
                                    variant="outlined"
                                    label="Content"
                                    value={this.state.notification.content}
                                    size="small"
                                    multiline
                                    rows={4}
                                    required
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    onChange={event => this.onUpdate("date", event)}
                                    id="date"
                                    label="Date"
                                    type="date"
                                    defaultValue={this.state.notification.date}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Select
                                    id="selectTypes"
                                    isMulti
                                    value={chosenClasses}
                                    options={classOptions}
                                    placeholder={"Classes"}
                                    onChange={this.onClassesUpdate}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <Typography variant="h5">
                                Attachments:
                                <IconButton component="label">
                                    <AddCircleOutlined />
                                    <input
                                        id="attachmentUpload"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={this.onAddFile}
                                    />
                                </IconButton>
                            </Typography>
                        </TableRow>
                        {
                            this.state.notification.files?.map((file, index) =>
                                <TableRow>
                                    <TableCell>
                                        <Typography>
                                            {file.name}
                                            <IconButton onClick={() => this.onDeleteFile(index)}>
                                                <Delete />
                                            </IconButton>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>

                <Button variant="contained" fullWidth={true} onClick={this.onConfirm}>
                    Confirm
                </Button>
                {
                    this.state.message && <div>
                        <Alert severity={this.state.success ? "info" : "error"}>
                            {this.state.message}
                        </Alert>
                    </div>
                }
            </div>
        )
    }
}

export default AddUpdateNotification;

import * as React from "react";
import {File} from "../../model/FIle";
import ApiService from "../../services/ApiService";
import {
    Button,
    CircularProgress,
    Dialog, DialogActions, DialogContent,
    IconButton,
    Table,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import {AddCircleOutlined, Delete, GetApp} from "@material-ui/icons";
import {Guid} from "guid-typescript";
import LocalStorageService from "../../services/LocalStorageService";
import {Alert} from "@material-ui/lab";

type MaterialsProps = {
    classId: string
    type: string,
    title: string,
}

type MaterialsState = {
    files: Array<File>,
    success: boolean,
    message?: string,
    uploading: boolean,
    fileToDelete?: File,
    classIds: Array<string>
}

class ClassMaterials extends React.Component<MaterialsProps, MaterialsState> {
    private fileName: string = "";
    private fileSize: number = 0;
    private fileType: string = "text/plain";

    public constructor(props: any) {
        super(props);
        this.state = {
            files: [],
            success: true,
            message: undefined,
            uploading: false,
            fileToDelete: undefined,
            classIds: []
        }
    }

    public async componentDidMount() {
        await this.refresh();
    }

    public refresh = async () => {
        let filesPromise = ApiService.files(this.props.classId, this.props.type);
        let groupsPromise = ApiService.groups(LocalStorageService.getUser().id);
        let [files, groups] = await Promise.all([filesPromise, groupsPromise]);
        let classIds = groups.map(group => group.classId);

        this.setState({
            files,
            classIds
        });
    }

    public getHumanReadableSize(fileSize: number): string {
        let i = -1;
        let byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSize = fileSize / 1024;
            i++;
        } while (fileSize > 1024);

        return Math.max(fileSize, 0.1).toFixed(1) + byteUnits[i];
    }

    public onFinishedUpload = async (event: any) => {
        let user = LocalStorageService.getUser();

        let content = event.target.result;
        let base64 = btoa(content);

        let file: File = {
            id: Guid.create().toString(),
            content: base64,
            name: this.fileName,
            classId: this.props.classId,
            type: this.props.type,
            date: new Date().toISOString().slice(0, 10),
            size: this.getHumanReadableSize(this.fileSize),
            mimeType: this.fileType,
            professorName: `${user.firstName} ${user.lastName}`,
            professorId: user.id,
            optionalText: undefined
        };

        this.setState({
            uploading: true,
        });

        let result = await ApiService.addUpdateFile(file);
        this.setState({
            success: result.success,
            message: result.message,
            uploading: false,
        })

        await this.refresh();
    }

    public onUpload = () => {
        let fileInputElement = document.getElementById("materialUpload") as HTMLInputElement;

        if(fileInputElement !== null && fileInputElement.files !== null) {
            if (fileInputElement.files[0]) {
                let file = fileInputElement.files[0];

                this.fileName = file.name;
                this.fileSize = file.size;
                this.fileType = file.type;

                let reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = this.onFinishedUpload;
            }
        }
    }

    public onDownload = (file: File) => {
        let content = atob(file.content);
        let blob = new Blob([content], {type: file.mimeType});
        let a = document.createElement('a');
        a.download = file.name;
        a.href = window.URL.createObjectURL(blob);
        a.textContent = "Download ready";
        a.hidden = true;
        a.click();
    }

    public onDelete = (file: File) => {
        this.setState({
            fileToDelete: file
        })
    }

    public onDeleteConfirm = async () => {
        let fileToDelete: File = this.state.fileToDelete as File;
        this.setState({
            fileToDelete: undefined
        })
        await ApiService.deleteFile(fileToDelete);

        let files = await ApiService.files(this.props.classId, this.props.type);
        this.setState({
            files
        });
    }

    public render() {
        return (
            <div>
                <Typography variant="h3" align="center">
                    {this.props.title}
                    {
                        (this.state.classIds.includes(this.props.classId) || LocalStorageService.getUser().userType === "admin")
                        && (this.state.uploading ? <CircularProgress /> : <IconButton component="label">
                            <AddCircleOutlined />
                            <input
                                id="materialUpload"
                                type="file"
                                style={{ display: "none" }}
                                onChange={this.onUpload}
                            />
                        </IconButton>)
                    }
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography>
                                    File name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    File size
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    Uploaded by
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    Uploaded date
                                </Typography>
                            </TableCell>
                            {
                                (this.state.classIds.includes(this.props.classId) || LocalStorageService.getUser().userType === "admin") &&
                                <TableCell>
                                    <Typography>
                                        Actions
                                    </Typography>
                                </TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    {
                        this.state.files.map(file => <TableRow>
                            <TableCell>
                                <Typography>
                                    {file.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {file.size}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {file.professorName}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {file.date}
                                </Typography>
                            </TableCell>
                            {
                                (this.state.classIds.includes(this.props.classId) || LocalStorageService.getUser().userType === "admin") &&
                                <TableCell>
                                    <IconButton onClick={() => this.onDownload(file)}>
                                        <GetApp />
                                    </IconButton>
                                    <IconButton>
                                        <Delete onClick={() => this.onDelete(file)}/>
                                    </IconButton>
                                </TableCell>
                            }
                        </TableRow>)
                    }
                </Table>
                {
                    this.state.message && <Alert severity={this.state.success ? "info" : "error"}>
                        {this.state.message}
                    </Alert>
                }
                <Dialog open={!!this.state.fileToDelete} onClose={() => this.setState({fileToDelete: undefined})}>
                    <DialogContent>
                        Are you sure you want to delete file {this.state.fileToDelete?.name}?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.onDeleteConfirm}>
                            Confirm
                        </Button>
                        <Button variant="contained" onClick={() => this.setState({fileToDelete: undefined})}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ClassMaterials;

import * as React from "react";
import {File} from "../../model/FIle";
import ApiService from "../../services/ApiService";
import {CircularProgress, IconButton, Table, TableCell, TableRow, Typography} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {Guid} from "guid-typescript";
import LocalStorageService from "../../services/LocalStorageService";
import {Alert} from "@material-ui/lab";

type MaterialsProps = {
    classId: string
    type: string
}

type MaterialsState = {
    files: Array<File>,
    success: boolean,
    message?: string,
    uploading: boolean
}

class ClassMaterials extends React.Component<MaterialsProps, MaterialsState> {
    private fileName: string = "";
    private fileSize: number = 0;

    public constructor(props: any) {
        super(props);
        this.state = {
            files: [],
            success: true,
            message: undefined,
            uploading: false,
        }
    }

    public async componentDidMount() {
        await this.refresh();
    }

    public refresh = async () => {
        let files = await ApiService.files(this.props.classId, this.props.type);
        this.setState({
            files
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

                let reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = this.onFinishedUpload;
            }
        }
    }

    public render() {
        return (
            <div>
                <Typography align="center" variant="h5">
                    Files
                    {
                        this.state.uploading ? <CircularProgress /> : <IconButton component="label">
                            <Add />
                            <input
                                id="materialUpload"
                                type="file"
                                style={{ display: "none" }}
                                onChange={this.onUpload}
                            />
                        </IconButton>
                    }
                </Typography>
                <Table size="small">
                    {
                        this.state.files.map(file => <TableRow>
                            <TableCell>
                                {file.name}
                            </TableCell>
                        </TableRow>)
                    }
                </Table>
                {
                    this.state.message && <Alert severity={this.state.success ? "info" : "error"}>
                        {this.state.message}
                    </Alert>
                }
            </div>
        )
    }
}

export default ClassMaterials;

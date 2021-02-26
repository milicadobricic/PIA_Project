import * as React from "react";
import {User} from "../../model/User";
import ApiService from "../../services/ApiService";
import {Button, Grid, Table, TableBody, TableCell, TableRow, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

type EmployeeProps = {
    employee: User,
}

type EmployeeState = {
    employee: User,
    success: boolean,
    message?: string,
}

class AddUpdateEmployee extends React.Component<EmployeeProps, EmployeeState> {
    public constructor(props: EmployeeProps) {
        super(props);
        this.state = {
            employee: props.employee,
            success: true,
            message: undefined,
        };
    }

    public componentDidMount() {
        this.setState({
            employee: this.props.employee,
        });
    }

    public componentDidUpdate(prevProps: Readonly<EmployeeProps>, prevState: Readonly<EmployeeProps>, snapshot?: any) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.setState({
                employee: this.props.employee,
            });
        }
    }

    public onUpdate = (key: string, event: any) => {
        let employee = this.state.employee;

        // @ts-ignore
        employee[key] = event.target.value;
        this.setState({
            employee
        });
    }

    public onUpdateEmployeeInfo = (key: string, event: any) => {
        let employee = this.state.employee;

        // @ts-ignore
        employee.employeeInfo[key] = event.target.value;
        this.setState({
            employee
        });
    }

    public onConfirm = async () => {
        let response = await ApiService.addUpdateEmployee(this.state.employee);
        this.setState({
            success: response.success,
            message: response.message
        });
    }

    public onFinishedUpload = (event: any) => {
        let content = event.target.result;
        let base64 = btoa(content);

        let employee = this.state.employee;
        // @ts-ignore
        employee.employeeInfo.profilePicture = "data:image/png;base64," + base64;

        this.setState({
            employee: employee
        });
    }

    public onUpload = () => {
        let fileInputElement = document.getElementById("fileUpload") as HTMLInputElement;

        if(fileInputElement !== null && fileInputElement.files !== null) {
            if (fileInputElement.files[0]) {
                let file = fileInputElement.files[0];
                let reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = this.onFinishedUpload;
            }
        }
    }

    public render() {
        return (
            <div>
                <Grid container direction="row">
                    <Grid item md={8}>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdate("firstName", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="First name"
                                            value={this.state.employee.firstName}
                                            size="small"
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdate("lastName", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Last name"
                                            value={this.state.employee.lastName}
                                            size="small"
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdate("username", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Username"
                                            value={this.state.employee.username}
                                            size="small"
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdate("status", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Status"
                                            value={this.state.employee.status}
                                            size="small"
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdateEmployeeInfo("address", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Address"
                                            value={this.state.employee.employeeInfo?.address}
                                            size="small"
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdateEmployeeInfo("phoneNumber", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Phone number"
                                            value={this.state.employee.employeeInfo?.phoneNumber}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdateEmployeeInfo("webSite", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Web site"
                                            value={this.state.employee.employeeInfo?.webSite}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdateEmployeeInfo("title", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Title"
                                            value={this.state.employee.employeeInfo?.title}
                                            size="small"
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdateEmployeeInfo("officeNumber", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Office number"
                                            value={this.state.employee.employeeInfo?.officeNumber}
                                            size="small"
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdateEmployeeInfo("biography", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Biography"
                                            value={this.state.employee.employeeInfo?.biography}
                                            size="small"
                                            multiline
                                            rows={4}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Button variant="contained" fullWidth={true} onClick={this.onConfirm}>
                                            Confirm
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item md={4}>
                        <div>
                            {
                                this.state.employee.employeeInfo?.profilePicture && <div>
                                    <img className="edit_profile_image" src={this.state.employee.employeeInfo.profilePicture} alt=""/>
                                </div>
                            }
                            <form id="uploadFormId" className="form">
                                <Button variant="contained" component="label" fullWidth={true}>
                                    Upload picture
                                    <input
                                        id="fileUpload"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={this.onUpload}
                                    />
                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
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

export default AddUpdateEmployee;

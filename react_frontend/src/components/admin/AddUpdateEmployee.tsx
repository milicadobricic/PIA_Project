import * as React from "react";
import {User} from "../../model/User";
import ApiService from "../../services/ApiService";
import {Button, Table, TableBody, TableCell, TableRow, TextField} from "@material-ui/core";
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
            message: undefined
        };
    }

    public componentDidMount() {
        this.setState({
            employee: this.props.employee
        });
    }

    public componentDidUpdate(prevProps: Readonly<EmployeeProps>, prevState: Readonly<EmployeeProps>, snapshot?: any) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.setState({
                employee: this.props.employee
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

    public render() {
        return (
            <div>
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

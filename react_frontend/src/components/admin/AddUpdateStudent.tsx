import * as React from "react";
import {User} from "../../model/User";
import {Button, MenuItem, Table, TableBody, TableCell, TableRow, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import ApiService from "../../services/ApiService";

type StudentProps = {
    student: User
}

type StudentState = {
    student: User,
    success: boolean,
    message?: string,
}

class AddUpdateStudent extends React.Component<StudentProps, StudentState> {
    public constructor(props: StudentProps) {
        super(props);
        this.state = {
            student: props.student,
            success: true,
            message: undefined
        };
    }

    public componentDidMount() {
        this.setState({
            student: this.props.student
        });
    }

    public componentDidUpdate(prevProps: Readonly<StudentProps>, prevState: Readonly<StudentState>, snapshot?: any) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.setState({
                student: this.props.student
            });
        }
    }

    public onUpdate = (key: string, event: any) => {
        let student = this.state.student;

        // @ts-ignore
        student[key] = event.target.value;
        this.setState({
            student
        });
    }

    public onUpdateLevel = (event: any) => {
        let student = this.state.student;

        // @ts-ignore
        student.studentInfo.level = event.target.value;
        this.setState({
            student
        });
    }

    public onConfirm = async () => {
        let response = await ApiService.addUpdateStudent(this.state.student);
        this.setState({
            success: response.success,
            message: response.message
        });
    }

    public render() {
        return (
            <div>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    onChange={event => this.onUpdate("firstName", event)}
                                    fullWidth={true}
                                    variant="outlined"
                                    label="First name"
                                    value={this.state.student.firstName}
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
                                    value={this.state.student.lastName}
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
                                    value={this.state.student.status}
                                    size="small"
                                    required
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    onChange={this.onUpdateLevel}
                                    fullWidth={true}
                                    variant="outlined"
                                    label="Study level"
                                    value={this.state.student.studentInfo?.level}
                                    size="small"
                                    required
                                    select={true}
                                >
                                    <MenuItem key="d" value="d">
                                        Bachelor's
                                    </MenuItem>
                                    <MenuItem key="m" value="m">
                                        Master's
                                    </MenuItem>
                                    <MenuItem key="p" value="p">
                                        Doctor's
                                    </MenuItem>
                                </TextField>
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

export default AddUpdateStudent;

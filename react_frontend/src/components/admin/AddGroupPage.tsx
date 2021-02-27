import * as React from "react";
import {User} from "../../model/User";
import {Class} from "../../model/Class";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";
import {Box, Button, Grid, MenuItem, Paper, TextField, Typography} from "@material-ui/core";
import {Guid} from "guid-typescript";
import {Group} from "../../model/Group";

type PageState = {
    employees?: Array<User>
    classes?: Array<Class>,
    employeeId?: string,
    classId?: string,
    success: boolean,
    message?: string,
    type: string,
    name: string,
    time: string,
}

class AddGroupPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            employees: undefined,
            classes: undefined,
            employeeId: undefined,
            classId: undefined,
            success: true,
            message: undefined,
            type: "Lecture",
            name: "",
            time: "",
        }
    }

    public async componentDidMount() {
        await this.refresh();
    }

    public refresh = async () => {
        let employeesPromise = ApiService.employees();
        let classesPromise = ApiService.classes();
        let [employees, classes] = await Promise.all([employeesPromise, classesPromise]);
        this.setState({
            employees,
            classes,
            employeeId: employees[0].id,
            classId: classes[0].id,
        });
    }

    public onUpdateEmployee = (event: any) => {
        let employeeId = event.target.value;
        this.setState({
            employeeId
        });
    }

    public onUpdateClass = (event: any) => {
        let classId = event.target.value;
        this.setState({
            classId
        });
    }

    public onUpdateType = (event: any) => {
        let type = event.target.value;
        this.setState({
            type
        });
    }

    public onUpdateName = (event: any) => {
        let name = event.target.value;
        this.setState({
            name
        });
    }

    public onUpdateTime = (event: any) => {
        let time = event.target.value;
        this.setState({
            time
        });
    }


    public onConfirm = async () => {
        let group: Group = {
            id: Guid.create().toString(),
            userId: this.state.employeeId as string,
            classId: this.state.classId as string,
            type: this.state.type,
            name: this.state.name,
            time: this.state.time,
        }

        let response = await ApiService.addUpdateGroup(group);
        this.setState({
            success: response.success,
            message: response.message,
        })
    }

    public render() {
        if (!this.state.employees || !this.state.classes) {
            return (
                <div>
                    <Alert severity="info">
                        <Typography>
                            Loading...
                        </Typography>
                    </Alert>
                </div>
            )
        }

        return (
            <div>
                <Box p={3}>
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container direction="row">
                                <Grid item md={3}>
                                    <TextField
                                        onChange={this.onUpdateEmployee}
                                        fullWidth={true}
                                        variant="outlined"
                                        label="Employee"
                                        value={this.state.employeeId}
                                        size="small"
                                        required
                                        select={true}
                                    >
                                        {this.state.employees.map(employee => <MenuItem key={employee.id} value={employee.id}>
                                            {employee.firstName} {employee.lastName} - {employee.employeeInfo?.title}
                                        </MenuItem>)}
                                    </TextField>
                                </Grid>
                                <Grid item md={3}>
                                    <TextField
                                        onChange={this.onUpdateClass}
                                        fullWidth={true}
                                        variant="outlined"
                                        label="Class"
                                        value={this.state.classId}
                                        size="small"
                                        required
                                        select={true}
                                    >
                                        {this.state.classes.map(classInfo => <MenuItem key={classInfo.id} value={classInfo.id}>
                                            {classInfo.name}
                                        </MenuItem>)}
                                    </TextField>
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        onChange={this.onUpdateType}
                                        fullWidth={true}
                                        variant="outlined"
                                        label="Type"
                                        value={this.state.type}
                                        size="small"
                                        required
                                        select={true}
                                    >
                                        <MenuItem key="Lecture" value="Lecture">
                                            Lecture
                                        </MenuItem>
                                        <MenuItem key="Exercise" value="Exercise">
                                            Exercise
                                        </MenuItem>
                                        <MenuItem key="Laboratory" value="Laboratory">
                                            Laboratory
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        onChange={this.onUpdateName}
                                        fullWidth={true}
                                        variant="outlined"
                                        label="Name"
                                        value={this.state.name}
                                        size="small"
                                        required
                                    />
                                </Grid>
                                <Grid item md={2}>
                                    <TextField
                                        onChange={this.onUpdateTime}
                                        fullWidth={true}
                                        variant="outlined"
                                        label="Time"
                                        value={this.state.time}
                                        size="small"
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Button onClick={this.onConfirm} fullWidth={true} variant="contained">
                                Add group to class
                            </Button>
                            {
                                this.state.message && <div>
                                    <Alert severity={this.state.success ? "info" : "error"}>
                                        {this.state.message}
                                    </Alert>
                                </div>
                            }
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default AddGroupPage;

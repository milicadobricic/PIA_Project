import * as React from "react";
import {User} from "../../model/User";
import {Class} from "../../model/Class";
import {Box, Button, Grid, MenuItem, Paper, TextField, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import ApiService from "../../services/ApiService";
import {Attendance} from "../../model/Attendance";
import {Guid} from "guid-typescript";

type PageState = {
    students?: Array<User>
    classes?: Array<Class>,
    studentId?: string,
    classId?: string,
    success: boolean,
    message?: string,
}

class AddStudentsToClassesPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            students: undefined,
            classes: undefined,
            studentId: undefined,
            classId: undefined,
            success: true,
            message: undefined,
        }
    }

    public async componentDidMount() {
        await this.refresh();
    }

    public refresh = async () => {
        let studentsPromise = ApiService.students();
        let classesPromise = ApiService.classes();
        let [students, classes] = await Promise.all([studentsPromise, classesPromise]);
        this.setState({
            students,
            classes,
            studentId: students[0].id,
            classId: classes[0].id,
        });
    }

    public onUpdateStudent = (event: any) => {
        let studentId = event.target.value;
        this.setState({
            studentId
        });
    }

    public onUpdateClass = (event: any) => {
        let classId = event.target.value;
        this.setState({
            classId
        });
    }

    public onConfirm = async () => {
        let attendance: Attendance = {
            id: Guid.create().toString(),
            userId: this.state.studentId as string,
            classId: this.state.classId as string,
        };

        let response = await ApiService.addUpdateAttendance(attendance);
        this.setState({
            success: response.success,
            message: response.message,
        })
    }

    public render() {
        if (!this.state.students || !this.state.classes) {
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
                                <Grid item md={4}>
                                    <TextField
                                        onChange={this.onUpdateStudent}
                                        fullWidth={true}
                                        variant="outlined"
                                        label="Student"
                                        value={this.state.studentId}
                                        size="small"
                                        required
                                        select={true}
                                    >
                                        {this.state.students.map(student => <MenuItem key={student.id} value={student.id}>
                                            {student.firstName} {student.lastName} - {student.username}
                                        </MenuItem>)}
                                    </TextField>
                                </Grid>
                                <Grid item md={4}>
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
                                <Grid item md={4}>
                                    <Button onClick={this.onConfirm} fullWidth={true} variant="contained">
                                        Add student to class
                                    </Button>
                                </Grid>
                            </Grid>
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

export default AddStudentsToClassesPage;

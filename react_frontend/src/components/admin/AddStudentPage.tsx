import * as React from "react";
import {User} from "../../model/User";
import {Guid} from "guid-typescript";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import AddUpdateStudent from "./AddUpdateStudent";

class AddStudentPage extends React.Component<any, any> {
    public render() {
        let student: User = {
            id: Guid.create().toString(),
            username: '',
            firstName: '',
            lastName: '',
            status: 'active',
            userType: 'student',
            isValidPassword: false,
            employeeInfo: undefined,
            studentInfo: {
                idNumber: '',
                level: 'd',
                approved: true,
            },
        };

        return (
            <div>
                <Box p={3} className="register_student_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h5">
                                        Register new student
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <AddUpdateStudent student={student} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default AddStudentPage;

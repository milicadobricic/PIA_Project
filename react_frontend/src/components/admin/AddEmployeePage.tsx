import * as React from "react";
import {User} from "../../model/User";
import {Guid} from "guid-typescript";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import AddUpdateEmployee from "./AddUpdateEmployee";

class AddEmployeePage extends React.Component<any, any> {
    public render() {
        let employee: User = {
            id: Guid.create().toString(),
            username: '',
            firstName: '',
            lastName: '',
            status: 'active',
            userType: 'employee',
            isValidPassword: false,
            employeeInfo: {
                address: '',
                phoneNumber: '',
                webSite: '',
                biography: '',
                title: '',
                officeNumber: '',
                profilePicture: undefined,
            },
            studentInfo: undefined,
        };

        return (
            <div>
                <Box p={3} className="register_employee_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h5">
                                        Register new employee
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <AddUpdateEmployee employee={employee} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default AddEmployeePage;

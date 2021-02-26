import * as React from "react";
import {
    Box,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";

class DashboardPage extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Box p={3}>
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container direction="row">
                                <Grid item md={4}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography variant="h5" align="center">
                                                        Manage students
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Button href="/register-student" fullWidth={true} variant="contained">
                                                        Register student
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Button href="/students" fullWidth={true} variant="contained">
                                                        Edit/Remove/Approve student
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Button href="/student-classes" fullWidth={true} variant="contained">
                                                        Add student to class
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item md={4}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography variant="h5" align="center">
                                                        Manage employees
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Button href="/register-employee" fullWidth={true} variant="contained">
                                                        Register employee
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Button href="/manage-employees" fullWidth={true} variant="contained">
                                                        Edit/Remove employee info
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item md={4}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography variant="h5" align="center">
                                                        Manage classes
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Button href="/create-class" fullWidth={true} variant="contained">
                                                        Create class
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Button href="/manage-classes" fullWidth={true} variant="contained">
                                                        Edit/Remove class
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default DashboardPage;

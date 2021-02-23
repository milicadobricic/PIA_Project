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
                                                    <Button href="/" fullWidth={true} variant="contained">
                                                        Edit employee info
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Button href="/" fullWidth={true} variant="contained">
                                                        Remove employee
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
                                                    <Button href="/" fullWidth={true} variant="contained">
                                                        Create class
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Button href="/" fullWidth={true} variant="contained">
                                                        Edit class
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <Button href="/" fullWidth={true} variant="contained">
                                                        Remove class
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

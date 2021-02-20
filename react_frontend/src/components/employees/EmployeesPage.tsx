import * as React from "react";
import {User} from "../../model/User";
import {Alert} from "@material-ui/lab";
import {Box, Link, Paper, Table, TableCell, TableRow, Typography} from "@material-ui/core";
import ApiService from "../../services/ApiService";

type PageState = {
    users?: Array<User>
}

class EmployeesPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            users: undefined
        };
    }

    public async componentDidMount() {
        let employees = await ApiService.employees();
        this.setState({
            users: employees
        });
    }

    public render() {
        if (!this.state.users) {
            return (
                <Alert severity="info">
                    <Typography>
                        Loading...
                    </Typography>
                </Alert>
            )
        }

        return (
            <Box p={3} className="employees_page">
                <Paper elevation={5}>
                    <Box p={3}>
                        <Table>
                            {
                                this.state.users.map(user =>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h6">
                                                <Link href={"/user/" + user.username}>
                                                    {user.firstName}&nbsp;{user.lastName}
                                                </Link>
                                                ,&nbsp;{user.employeeInfo?.title}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </Table>
                    </Box>
                </Paper>
            </Box>
        )
    }
}

export default EmployeesPage;

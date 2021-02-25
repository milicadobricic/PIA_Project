import * as React from "react";
import {User} from "../../model/User";
import {Alert} from "@material-ui/lab";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    IconButton,
    Link,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@material-ui/core";
import ApiService from "../../services/ApiService";
import DeleteIcon from '@material-ui/icons/Delete';

type PageState = {
    employees?: User[],
    employeeToDelete?: User,
    message?: string,
    success: boolean
}

class EmployeeListPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            employees: undefined,
            employeeToDelete: undefined,
            message: undefined,
            success: true
        };
    }

    public async componentDidMount() {
        let employees = await ApiService.employees();
        this.setState({
            employees
        });
    }

    public onDelete = (employee: User) => {
        this.setState({
            employeeToDelete: employee,
        })
    };

    public onDeleteConfirm = async () => {
        let employeeToDelete = this.state.employeeToDelete;

        this.setState({
            employees: undefined,
            employeeToDelete: undefined,
        })

        await ApiService.deleteUser(employeeToDelete as User);

        let employees = await ApiService.employees();
        this.setState({
            employees
        })
    };

    public render() {
        if (this.state.employees === undefined) {
            return (
                <Alert severity="info">
                    <Typography>
                        Loading...
                    </Typography>
                </Alert>
            )
        }

        if (this.state.employees.length === 0) {
            return (
                <Alert severity="info">
                    <Typography>
                        There are no registered employees!
                    </Typography>
                </Alert>
            )
        }

        return (
            <div>
                <Table size="small">
                    <TableBody>
                        {
                            this.state.employees.map(employee =>
                                <TableRow>
                                    <TableCell>
                                        <Typography align="center">
                                            <IconButton size="small" onClick={() => this.onDelete(employee)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <Link href={"/employee/" + employee.id}>
                                                {employee.firstName} {employee.lastName}, {employee.employeeInfo?.title}
                                            </Link>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
                <Dialog open={!!this.state.employeeToDelete} onClose={() => this.setState({employeeToDelete: undefined})}>
                    <DialogContent>
                        Are you sure you want to delete employee {this.state.employeeToDelete?.firstName} {this.state.employeeToDelete?.lastName}, {this.state.employeeToDelete?.employeeInfo?.title}?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.onDeleteConfirm}>Confirm</Button>
                        <Button variant="contained" onClick={() => this.setState({employeeToDelete: undefined})}>Cancel</Button>
                    </DialogActions>
                </Dialog>
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

export default EmployeeListPage;

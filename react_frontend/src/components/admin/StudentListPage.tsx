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
    students?: User[],
    studentToDelete?: User,
}

class StudentListPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            students: undefined
        };
    }

    public async componentDidMount() {
        let students = await ApiService.students();
        this.setState({
            students
        });
    }

    public static getHumanReadableLevel(level?: string): string {
        switch (level) {
            case "d": return "Bachelor's";
            case "m": return "Master's";
            case "p": return "Doctor's";
            default: return "Unknown";
        }
    }

    public onDelete = (student: User) => {
        this.setState({
            studentToDelete: student,
        })
    };

    public onConfirm = async () => {
        let studentToDelete = this.state.studentToDelete;

        this.setState({
            students: undefined,
            studentToDelete: undefined,
        })

        await ApiService.deleteStudent(studentToDelete as User);

        let students = await ApiService.students();
        this.setState({
            students
        })
    };

    public render() {
        if (this.state.students === undefined) {
            return (
                <Alert severity="info">
                    <Typography>
                        Loading...
                    </Typography>
                </Alert>
            )
        }

        if (!this.state.students) {
            return (
                <Alert severity="info">
                    <Typography>
                        There are no registered students!
                    </Typography>
                </Alert>
            )
        }

        return (
            <div>
                <Table size="small">
                    <TableBody>
                        {
                            this.state.students.map(student =>
                                <TableRow>
                                    <TableCell>
                                        <Typography align="center">
                                            <IconButton size="small" onClick={() => this.onDelete(student)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <Link href={"/student/" + student.id}>
                                                {student.firstName} {student.lastName}, {student.studentInfo?.idNumber} - {StudentListPage.getHumanReadableLevel(student.studentInfo?.level)}
                                            </Link>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
                <Dialog open={!!this.state.studentToDelete} onClose={() => this.setState({studentToDelete: undefined})}>
                    <DialogContent>
                        Are you sure you want to delete student {this.state.studentToDelete?.firstName} {this.state.studentToDelete?.lastName}, {this.state.studentToDelete?.studentInfo?.idNumber} - {StudentListPage.getHumanReadableLevel(this.state.studentToDelete?.studentInfo?.level)}?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.onConfirm}>Confirm</Button>
                        <Button variant="contained" onClick={() => this.setState({studentToDelete: undefined})}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default StudentListPage;

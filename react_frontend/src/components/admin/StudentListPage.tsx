import * as React from "react";
import {User} from "../../model/User";
import {Alert} from "@material-ui/lab";
import {Link, Table, TableBody, TableCell, TableRow, Typography} from "@material-ui/core";
import ApiService from "../../services/ApiService";

type PageState = {
    students?: User[]
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
                                        <Link href={"/student/" + student.id}>
                                            <Typography align="center">
                                                {student.firstName} {student.lastName}, {student.studentInfo?.idNumber} - {StudentListPage.getHumanReadableLevel(student.studentInfo?.level)}
                                            </Typography>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default StudentListPage;

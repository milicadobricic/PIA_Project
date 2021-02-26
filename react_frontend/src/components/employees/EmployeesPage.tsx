import * as React from "react";
import {User} from "../../model/User";
import {Alert} from "@material-ui/lab";
import {Box, Link, Paper, Table, TableCell, TableRow, Typography} from "@material-ui/core";
import ApiService from "../../services/ApiService";
import {Group} from "../../model/Group";
import {Class} from "../../model/Class";

type PageState = {
    users?: Array<User>,
    groups?: Array<Group>,
    classes?: Array<Class>,
}

class EmployeesPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            users: undefined,
            groups: undefined,
            classes: undefined,
        };
    }

    public async componentDidMount() {
        let employeesPromise = ApiService.employees();
        let groupsPromise = ApiService.groups();
        let classesPromise = ApiService.classes();
        let [employees, groups, classes] = await Promise.all([employeesPromise, groupsPromise, classesPromise]);
        this.setState({
            users: employees,
            groups,
            classes
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

        let classesPerId: {[classId: string]: Class} = {}
        this.state.classes?.forEach(c => {
            classesPerId[c.id] = c;
        })

        let classIdsPerUser: {[userId: string]: Set<string>} = {};
        this.state.users.forEach(u => classIdsPerUser[u.id] = new Set<string>());
        this.state.groups?.forEach(g => classIdsPerUser[g.userId].add(g.classId));

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
                                                , Classes: {Array.from(classIdsPerUser[user.id]).map(classId => classesPerId[classId].name).join(", ") || "No classes"}
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

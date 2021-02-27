import * as React from "react";
import {Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import ClassTabs from "./ClassTabs";
import {Group} from "../../model/Group";
import {User} from "../../model/User";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";

type PageState = {
    groups: Array<Group>,
    users: Array<User>
}

class LecturersPage extends React.Component<any, PageState>{
    public constructor(props: any) {
        super(props);

        this.state = {
            groups: [],
            users: []
        }
    }

    public async componentDidMount() {
        let classId = this.props.match.params.id;
        let groupsByClassPromise = ApiService.groupsByClass(classId);
        let usersPromise = ApiService.allUsers();
        let [groups, allUsers] = await Promise.all([groupsByClassPromise, usersPromise]);

        let userIds = groups.map(group => group.userId);
        let users = allUsers.filter(user => userIds.includes(user.id));
        this.setState({
            groups,
            users
        });
    }

    private getUserInfo(userId: string) {
        let user = this.state.users.filter(user => user.id === userId)[0];
        return user.firstName + " " + user.lastName;
    }

    public render() {
        if (!this.state.groups || !this.state.users) {
            return (
                <Alert severity="info">
                    <Typography>
                        Loading...
                    </Typography>
                </Alert>
            )
        }

        return (
            <div>
                <Box p={3} className="class_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <ClassTabs index={1} classId={this.props.match.params.id} />
                            <Typography variant="h3" align="center">
                                Lectures and exercises
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                Type
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                Lecturer
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                Time
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.groups.map(group =>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography>
                                                        {group.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        {group.type}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        {this.getUserInfo(group.userId)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        {group.time}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default LecturersPage;

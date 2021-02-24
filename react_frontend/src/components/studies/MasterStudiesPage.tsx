import * as React from "react";
import {Class} from "../../model/Class";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";
import {Box, Link, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";

type PageState = {
    classes?: Array<Class>
}

class MasterStudiesPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            classes: undefined,
        }
    }

    public async componentDidMount() {
        let classes = await ApiService.classes("MA");

        this.setState({
            classes
        })
    }

    public static getCode(classInfo: Class): string {
        let code = classInfo.codes.filter(c => c.department === "MA")[0];
        return `${code.department}${code.year}${code.subject}`;
    }

    public render() {
        if (!this.state.classes) {
            return (
                <Alert severity="info">
                    <Typography>
                        Loading...
                    </Typography>
                </Alert>
            )
        }

        return (
            <div className="classes_page">
                <Box p={3}>
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Table size="small">
                                <TableHead className="table_header">
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                <strong>
                                                    Code
                                                </strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>
                                                    Subject
                                                </strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>
                                                    Status
                                                </strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>
                                                    Number of lessons
                                                </strong>
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                <strong>
                                                    Credits
                                                </strong>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.classes.map(classInfo =>
                                            <TableRow>
                                                <TableCell>
                                                    <Link href="/">
                                                        <Typography>
                                                            {MasterStudiesPage.getCode(classInfo)}
                                                        </Typography>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        {classInfo.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        {classInfo.mandatory ? "Mandatory" : "Optional"}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        {classInfo.classesPerWeek}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>
                                                        {classInfo.credits}
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

export default MasterStudiesPage;

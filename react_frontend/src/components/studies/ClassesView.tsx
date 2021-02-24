import * as React from "react";
import {Class} from "../../model/Class";
import {Link, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";

type ViewProps = {
    classes: Array<Class>,
    group: string
}

class ClassesView extends React.Component<ViewProps, any> {
    public getCode(classInfo: Class): string {
        let code = classInfo.codes.filter(c => c.group === this.props.group.toUpperCase())[0];
        return `${code.department}${code.year}${code.subject}`;
    }

    public render() {
        console.log(this.props.classes);
        return (
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
                        this.props.classes.map((classInfo: Class) =>
                            <TableRow>
                                <TableCell>
                                    <Link href="/">
                                        <Typography>
                                            {this.getCode(classInfo)}
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
        )
    }
}

export default ClassesView;

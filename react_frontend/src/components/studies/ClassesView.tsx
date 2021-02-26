import * as React from "react";
import {Class} from "../../model/Class";
import {Link, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import LocalStorageService from "../../services/LocalStorageService";
import ApiService from "../../services/ApiService";

type ViewProps = {
    classes: Array<Class>,
    group: string
}

type ViewState = {
    classIds: Array<string>
}

class ClassesView extends React.Component<ViewProps, ViewState> {
    public constructor(props: ViewProps) {
        super(props);
        this.state = {
            classIds: []
        };
    }

    public async componentDidMount() {
        let user = LocalStorageService.getUser();
        if (!user) return;
        let attendances = await ApiService.attendances(user.id);
        let classIds = attendances.map(a => a.classId);
        console.log(classIds);
        this.setState({
            classIds
        });
    }

    public getCode(classInfo: Class): string {
        let code = classInfo.codes.filter(c => c.group === this.props.group.toUpperCase())[0];
        return `${code.department}${code.year}${code.subject}`;
    }

    public shouldRenderLink(classId: string): boolean {
        let user = LocalStorageService.getUser();
        if (!user) return false;
        if (user.userType !== "student") return true;
        return this.state.classIds.includes(classId);
    }

    public render() {
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
                                    {
                                        this.shouldRenderLink(classInfo.id) ? <div>
                                            <Link href={"/class/info/" + classInfo.id}>
                                                <Typography>
                                                    {this.getCode(classInfo)}
                                                </Typography>
                                            </Link>
                                        </div> : <div>
                                            <Typography>
                                                {this.getCode(classInfo)}
                                            </Typography>
                                        </div>
                                    }
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

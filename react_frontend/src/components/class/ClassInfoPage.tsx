import * as React from "react";
import ApiService from "../../services/ApiService";
import {Class, Code} from "../../model/Class";
import {Alert} from "@material-ui/lab";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import ClassTabs from "./ClassTabs";
import LocalStorageService from "../../services/LocalStorageService";

type PageState = {
    classInfo?: Class,
    classIds: Array<string>
}

class ClassInfoPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            classInfo: undefined,
            classIds: []
        }
    }

    public async componentDidMount() {
        let classId = this.props.match.params.id;
        let classInfoPromise = ApiService.class(classId);
        let groupsPromise = ApiService.groups(LocalStorageService.getUser().id);
        let [classInfo, groups] = await Promise.all([classInfoPromise, groupsPromise]);
        let classIds = groups.map(g => g.classId);
        this.setState({
            classInfo,
            classIds
        });
    }

    public static generateAcronym(code: Code){
        return code.department + code.year + code.subject;
    }

    public render() {
        let user = LocalStorageService.getUser();

        let infoList: Array<{label: string, value?: any}> = [
            {label: "Status", value: this.state.classInfo?.mandatory ? "Mandatory" : "Optional"},
            {label: "Acronyms", value: this.state.classInfo?.codes.map(code => ClassInfoPage.generateAcronym(code)).join(", ")},
            {label: "Classes per week", value: this.state.classInfo?.classesPerWeek},
            {label: "Credits", value: this.state.classInfo?.credits},
            {label: "Requirements", value: this.state.classInfo?.requirements},
            {label: "Goal", value: this.state.classInfo?.goal},
            {label: "Description", value: this.state.classInfo?.description},
        ];

        if (!this.state.classInfo) {
            return (
                <Alert severity="info">
                    <Typography>
                        Loading...
                    </Typography>
                </Alert>
            )
        }

        return (
            <Box p={3} className="class_page">
                <Paper elevation={5}>
                    <Box p={3}>
                        <ClassTabs index={0} classId={this.state.classInfo.id} />
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Typography variant="h3" align="center">
                                            {this.state.classInfo.name}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    infoList.map(item =>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    {item.label}:&nbsp;
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5" color="primary">
                                                    {item.value}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                        {
                            this.state.classInfo && (this.state.classIds.includes(this.state.classInfo.id) || user.userType === "admin") &&
                            <div>
                                <Button href={"/edit-class/" + this.state.classInfo.id} variant="contained" fullWidth={true}>
                                    Edit class
                                </Button>
                            </div>
                        }
                    </Box>
                </Paper>
            </Box>
        )
    }
}

export default ClassInfoPage;

import * as React from "react";
import ClassTabs from "./ClassTabs";
import {Box, Grid, IconButton, Paper, TextField, Typography} from "@material-ui/core";
import ClassMaterials from "./ClassMaterials";
import {Class} from "../../model/Class";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";
import {Save} from "@material-ui/icons";
import LocalStorageService from "../../services/LocalStorageService";

type PageState = {
    classInfo?: Class,
    classIds: Array<string>,
    success: boolean,
    message?: string,
}

class PracticalLessonsPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            classInfo: undefined,
            success: true,
            message: undefined,
            classIds: []
        }
    }

    public async componentDidMount() {
        let classInfo = await ApiService.class(this.props.match.params.id);
        let groups = await ApiService.groups(LocalStorageService.getUser().id);
        let classIds = groups.map(group => group.classId);
        this.setState({
            classInfo,
            classIds
        })
    }

    public update = (event: any) => {
        let classInfo: Class = this.state.classInfo as Class;
        classInfo.practicalLessonsInfo = event.target.value;

        this.setState({
            classInfo
        })
    }

    public save = async () => {
        let result = await ApiService.addUpdateClass(this.state.classInfo as Class);
        console.log(this.state.classInfo);
        this.setState({
            success: result.success,
            message: result.message,
        })
    };

    public render() {
        return (
            <div>
                <Box p={3} className="class_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <ClassTabs index={6} classId={this.props.match.params.id} />
                            <ClassMaterials classId={this.props.match.params.id} type="practical" title="Practical lessons" />
                            {
                                this.state.classInfo && (this.state.classIds.includes(this.props.match.params.id) || LocalStorageService.getUser().userType === "admin") &&
                                    <Grid container direction="row">
                                        <Grid item md={11}>
                                            <TextField
                                                onChange={this.update}
                                                fullWidth={true}
                                                variant="outlined"
                                                label="Practical lessons info"
                                                value={this.state.classInfo.practicalLessonsInfo}
                                                size="small"
                                                multiline
                                                rows={3}
                                                required
                                            />
                                        </Grid>
                                        <Grid item md={1}>
                                            <IconButton onClick={this.save}>
                                                <Save />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                            }
                            {
                                this.state.classInfo && !(this.state.classIds.includes(this.props.match.params.id) || LocalStorageService.getUser().userType === "admin")
                                && this.state.classInfo.practicalLessonsInfo !== "" &&
                                <Box p={3} className="class_page">
                                    <Paper elevation={5}>
                                        <Box p={3}>
                                            <Typography>
                                                {this.state.classInfo.practicalLessonsInfo}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Box>
                            }
                            {
                                this.state.message &&
                                    <Alert severity={this.state.success ? "info" : "error"}>
                                        {this.state.success ? "Info updated!" : "Update failed!"}
                                    </Alert>
                            }
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default PracticalLessonsPage;

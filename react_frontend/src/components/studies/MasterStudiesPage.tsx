import * as React from "react";
import {Class} from "../../model/Class";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";
import {Box, Paper, Typography} from "@material-ui/core";
import ClassesView from "./ClassesView";

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
                            <ClassesView classes={this.state.classes} group="MA"/>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default MasterStudiesPage;

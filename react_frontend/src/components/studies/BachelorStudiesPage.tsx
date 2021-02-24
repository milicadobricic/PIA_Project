import * as React from "react";
import ApiService from "../../services/ApiService";
import {Class} from "../../model/Class";
import ClassesView from "./ClassesView";
import {Alert} from "@material-ui/lab";
import {Box, Paper, Typography} from "@material-ui/core";

type PageState = {
    classes?: Array<Class>
}

class BachelorStudiesPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            classes: undefined
        }
    }

    public async componentDidMount() {//others
        let group = this.props.match.params.group;
        let classes = await ApiService.classes(group);
        this.setState({
            classes
        });
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
            <div>
                {
                    [1,2,3,4,5,6,7,8].map(index => {
                        let classes: Array<Class> | undefined = this.state.classes?.filter((classInfo: Class) => classInfo.codes.filter(code => code.semester === index && code.group === this.props.match.params.group.toUpperCase()).length > 0);

                        return (
                            <div className="classes_page">
                                <Box p={3}>
                                    <Paper elevation={5}>
                                        <Box p={3}>
                                            <Typography variant="h5" align="center">{index}. semester</Typography>
                                            {
                                                classes && classes.length > 0 &&
                                                <ClassesView classes={classes} group={this.props.match.params.group.toUpperCase()}/>
                                            }
                                        </Box>
                                    </Paper>
                                </Box>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default BachelorStudiesPage;

import * as React from "react";
import {User} from "../../model/User";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import AddUpdateStudent from "./AddUpdateStudent";

type PageState = {
    user?: User
}

class EditStudentPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            user: undefined
        };
    }


    public async componentDidMount() {
        let id = this.props.match.params.id;
        let user = await ApiService.user('', id);
        this.setState({
            user
        });
    }

    public render() {
        if (!this.state.user) {
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
                <Box p={3} className="register_student_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h5">
                                        Edit student info
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <AddUpdateStudent student={this.state.user} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default EditStudentPage;

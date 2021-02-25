import * as React from "react";
import {Notification} from "../../model/Notification";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import AddUpdateNotification from "./AddUpdateNotification";

type PageState = {
    notification?: Notification
}

class EditNotificationPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            notification: undefined
        };
    }


    public async componentDidMount() {
        let id = this.props.match.params.id;
        let notification = await ApiService.notification(id);

        this.setState({
            notification
        });
    }

    public render() {
        if (!this.state.notification) {
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
                <Box p={3} className="register_employee_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h5">
                                        Edit notification
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <AddUpdateNotification notification={this.state.notification} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default EditNotificationPage;

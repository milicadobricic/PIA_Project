import * as React from "react";
import {Notification} from "../../model/Notification";
import {Guid} from "guid-typescript";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import AddUpdateNotification from "./AddUpdateNotification";

class CreateNotificationPage extends React.Component<any, any>{
    public render() {
        let notification: Notification = {
            id: Guid.create().toString(),
            title: '',
            content: '',
            date: new Date().toISOString().slice(0, 10),
            classes: []
        };

        return (
            <div>
                <Box p={3} className="create_class_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h5">
                                        Add new notification
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <AddUpdateNotification notification={notification} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default CreateNotificationPage;

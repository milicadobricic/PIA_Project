import * as React from "react";
import {Class} from "../../model/Class";
import {Guid} from "guid-typescript";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import AddUpdateClass from "./AddUpdateClass";

class CreateClassPage extends React.Component<any, any> {
    public render() {
        let classInfo: Class = {
            id: Guid.create().toString(),
            name: '',
            mandatory: true,
            codes: [],
            classesPerWeek: 1,
            credits: 1,
            requirements: '',
            goal: '',
            description: ''
        };

        return (
            <div>
                <Box p={3} className="create_class_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h5">
                                        Add new class
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <AddUpdateClass classInfo={classInfo} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default CreateClassPage;

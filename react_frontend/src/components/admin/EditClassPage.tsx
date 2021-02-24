import * as React from "react";
import {Class} from "../../model/Class";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import AddUpdateClass from "./AddUpdateClass";

type PageState = {
    classInfo?: Class
}

class EditClassPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            classInfo: undefined
        };
    }


    public async componentDidMount() {
        let id = this.props.match.params.id;
        let classInfo = await ApiService.class(id);
        
        this.setState({
            classInfo
        });
    }

    public render() {
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
            <div>
                <Box p={3} className="register_employee_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h5">
                                        Edit class info
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <AddUpdateClass classInfo={this.state.classInfo} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default EditClassPage;

import * as React from "react";
import {Box, Button, Grid, MenuItem, Paper, TextField, Typography} from "@material-ui/core";
import ApiService from "../../services/ApiService";

const padding: number = 1;
const outerPadding: number = 3;
const elevation: number = 5;
const innerPadding: number = 3;

type PageState = {
    success?: boolean,
    message?: string,
    studyLevel: string
}

class RegisterPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            success: true,
            message: undefined,
            studyLevel: "d"
        }
    }

    public onRegister = async () => {
        let firstNameInput = document.getElementById("firstNameInput") as HTMLInputElement;
        let lastNameInput = document.getElementById("lastNameInput") as HTMLInputElement;
        let firstName = firstNameInput.value;
        let lastName = lastNameInput.value;

        let response = await ApiService.register(firstName, lastName, this.state.studyLevel);
        this.setState({
            success: response.success,
            message: response.message
        })
    };

    public onStudyLevelChange = (event: any) => {
        this.setState({
            studyLevel: event.target.value
        });
    }

    public render() {
        return (
            <div>
                <Box p={outerPadding} className="register_page">
                    <Paper elevation={elevation}>
                        <Box p={innerPadding}>
                    <Grid container direction="column">
                        <Grid item>
                            <Box>
                                <Typography variant="h5">Register</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box pt={padding}>
                                <TextField id="firstNameInput" variant="outlined" size="small" label="First name" fullWidth={true} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box pt={padding}>
                                <TextField id="lastNameInput" variant="outlined" size="small" label="Last name" fullWidth={true} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box pt={padding}>
                                <TextField onChange={this.onStudyLevelChange} defaultValue="d" id="studyLevelInput" select variant="outlined" size="small" label="Study level" fullWidth={true}>
                                    <MenuItem key="d" value="d">
                                        Bachelor's
                                    </MenuItem>
                                    <MenuItem key="m" value="m">
                                        Master's
                                    </MenuItem>
                                    <MenuItem key="p" value="p">
                                        Doctor's
                                    </MenuItem>
                                </TextField>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box pt={padding}>
                                <Button variant="contained" fullWidth={true} onClick={this.onRegister}>Register</Button>
                            </Box>
                        </Grid>
                        <Grid item>
                            {
                                this.state.message && <Typography color={this.state.success ? "primary" : "error"}>
                                    {this.state.message}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default RegisterPage;

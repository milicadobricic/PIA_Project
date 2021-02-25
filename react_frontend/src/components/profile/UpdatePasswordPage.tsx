import * as React from "react";
import {Box, Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import ApiService from "../../services/ApiService";
import LocalStorageService from "../../services/LocalStorageService";

const paddingTop = 1;

type PageState = {
    message?: string
}

class UpdatePasswordPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            message: undefined
        };
    }


    public onUpdatePassword = async () => {
        let user = LocalStorageService.getUser();

        let oldPasswordInput = document.getElementById("oldPasswordInput") as HTMLInputElement;
        let newPasswordInput = document.getElementById("newPasswordInput") as HTMLInputElement;
        let confirmPasswordInput = document.getElementById("confirmPasswordInput") as HTMLInputElement;
        let oldPassword = oldPasswordInput.value;
        let newPassword = newPasswordInput.value;
        let confirmPassword = confirmPasswordInput.value;

        if (newPassword !== confirmPassword) {
            this.setState({
                message: "Confirmed password is not same as new!"
            });
        } else {
            let response = await ApiService.updatePassword(user.id, oldPassword, newPassword);
            if (response.success) {
                LocalStorageService.removeUser();
                window.location.href = "/";
            } else {
                this.setState({
                    message: response.message
                });
            }
        }
    }

    public render() {
        return (
            <div>
                <Box p={3} className="edit_profile_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h5">
                                        Update your password
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Box pt={paddingTop}>
                                        <TextField id="oldPasswordInput" variant="outlined" size="small" label="Old password" type="password" fullWidth={true} />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box pt={paddingTop}>
                                        <TextField id="newPasswordInput" variant="outlined" size="small" label="New password" type="password" fullWidth={true} />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box pt={paddingTop}>
                                        <TextField id="confirmPasswordInput" variant="outlined" size="small" label="Confirm password" type="password" fullWidth={true} />
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box pt={paddingTop}>
                                        <Button variant="contained" fullWidth={true} onClick={this.onUpdatePassword}>Update password</Button>
                                    </Box>
                                </Grid>
                                {
                                    this.state.message && <Grid item>
                                        <Box pt={paddingTop}>
                                            <Alert severity="error">
                                                {this.state.message}
                                            </Alert>
                                        </Box>
                                    </Grid>
                                }
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default UpdatePasswordPage;

import * as React from "react";
import {Box, Button, Grid, Link, TextField, Typography} from "@material-ui/core";
import ApiService from "../../services/ApiService";
import LocalStorageService from "../../services/LocalStorageService";

const padding: number = 1;

type FormState = {
    message?: string
}

class LoginForm extends React.Component<any, FormState>{
    public constructor(props: any) {
        super(props);

        this.state = {
            message: undefined,
        }
    }

    public onLogIn = async () => {
        let usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
        let passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
        let username = usernameInput.value;
        let password = passwordInput.value;

        let response = await ApiService.login(username, password);
        if (response.user && response.success) {
            LocalStorageService.setUser(response.user);
            window.location.href = "/";
        } else {
            this.setState({
                message: response.message
            })
        }
    }

    public render() {
        return(
            <Grid container direction="column">
                <Grid item>
                    <Box>
                        <Typography variant="h5">Log in</Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box pt={padding}>
                        <TextField id="usernameInput" variant="outlined" size="small" label="Username" fullWidth={true} />
                    </Box>
                </Grid>
                <Grid item>
                    <Box pt={padding}>
                        <TextField id="passwordInput" variant="outlined" size="small" label="Password" type="password" fullWidth={true} />
                    </Box>
                </Grid>
                <Grid item>
                    <Box pt={padding}>
                        <Button variant="contained" fullWidth={true} onClick={this.onLogIn}>Log in</Button>
                    </Box>
                </Grid>
                <Grid item>
                    {
                        this.state.message && <Typography color="error">
                            {this.state.message}
                        </Typography>
                    }
                </Grid>
                <Grid item>
                    <Box pt={padding}>
                        <Typography>
                            Don't have an account? Register&nbsp;
                            <Link href="/" >
                                here
                            </Link>
                            !
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default LoginForm

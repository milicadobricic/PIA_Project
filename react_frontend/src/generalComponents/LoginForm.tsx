import * as React from "react";
import {Box, Button, Grid, Link, Paper, TextField, Typography} from "@material-ui/core";

const padding: number = 1;

class LoginForm extends React.Component<any, any>{
    public render() {
        return(
            <Box p={3}>
                <Paper elevation={5}>
                    <Box p={3}>
                        <Grid container direction="column">
                            <Grid item>
                                <Box>
                                    <Typography variant="h5">Log in</Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box pt={padding}>
                                    <TextField variant="outlined" size="small" label="Username" fullWidth={true} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box pt={padding}>
                                    <TextField variant="outlined" size="small" label="Password" type="password" fullWidth={true} />
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box pt={padding}>
                                    <Button variant="contained" fullWidth={true}>Log in</Button>
                                </Box>
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
                    </Box>
                </Paper>
            </Box>
        )
    }
}

export default LoginForm

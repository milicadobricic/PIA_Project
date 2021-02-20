import * as React from "react";
import {User} from "../../model/User";
import {Button, Grid, Typography} from "@material-ui/core";
import LocalStorageService from "../../services/LocalStorageService";

type InfoProps = {
    user: User
}

class UserBasicInfo extends React.Component<InfoProps, any> {
    public onLogOut = () => {
        LocalStorageService.removeUser();
        window.location.href = "/";
    }

    public render() {
        return (
            <Grid container direction="column">
                <Grid item>
                    <Typography variant="h4">
                        Profile
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row">
                        <Grid item>
                            <Typography variant="h6">
                                Username:&nbsp;
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" color="primary">
                                {this.props.user.username}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container direction="row">
                        <Grid item>
                            <Typography variant="h6">
                                User type:&nbsp;
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" color="primary">
                                {this.props.user.userType}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={this.onLogOut}>
                        Log out
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default UserBasicInfo;

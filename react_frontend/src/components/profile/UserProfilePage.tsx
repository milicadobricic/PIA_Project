import * as React from "react";
import {User} from "../../model/User";
import {Alert} from "@material-ui/lab";
import {Typography} from "@material-ui/core";
import ProfilePage from "./ProfilePage";
import ApiService from "../../services/ApiService";

type PageState = {
    user?: User
}

class UserProfilePage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            user: undefined
        };
    }

    public async componentDidMount() {
        let username = this.props.match.params.username;
        let user = await ApiService.user(username);
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

        return <ProfilePage user={this.state.user} />
    }
}

export default UserProfilePage;

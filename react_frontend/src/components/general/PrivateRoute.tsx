import * as React from "react";
import {User} from "../../model/User";
import LocalStorageService from "../../services/LocalStorageService";
import NotFound from "./NotFound";

type RouteProps = {
    roles: Array<string>
}

class PrivateRoute extends React.Component<RouteProps, any> {
    public render() {
        let user: User = LocalStorageService.getUser();

        if(user === null || !this.props.roles.includes(user.userType))
            return <NotFound/>;

        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default PrivateRoute;

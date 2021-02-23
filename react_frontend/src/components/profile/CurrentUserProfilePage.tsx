import * as React from "react";
import LocalStorageService from "../../services/LocalStorageService";
import ProfilePage from "./ProfilePage";

class CurrentUserProfilePage extends React.Component<any, any>{
    public render() {
        let user = LocalStorageService.getUser();
        return <ProfilePage user={user} />
    }
}

export default CurrentUserProfilePage;

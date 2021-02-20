import * as React from "react";
import LocalStorageService from "../../services/LocalStorageService";
import CurrentUserProfilePage from "./ProfilePage";

class ProfilePage extends React.Component<any, any>{
    public render() {
        let user = LocalStorageService.getUser();
        return <CurrentUserProfilePage user={user} />
    }
}

export default ProfilePage;

import * as React from 'react';
import {AppBar, Box, Button, Toolbar} from "@material-ui/core";
import LocalStorageService from "../../services/LocalStorageService";

class Header extends React.Component<any, any>{
    public onLogOut = () => {
        LocalStorageService.removeUser();
        window.location.href = "/";
    }

    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let user = LocalStorageService.getUser();

        return(
            <AppBar color="primary" position="static">
                <Toolbar variant="dense">
                    <Button href="/" color="inherit">
                        Home
                    </Button>
                    <Button href="/" color="inherit">
                        Employees
                    </Button>
                    <Button href="/" color="inherit">
                        News
                    </Button>
                    <Button href="/" color="inherit">
                        Bachelor studies
                    </Button>
                    <Button href="/" color="inherit">
                        Master studies
                    </Button>
                    <Button href="/" color="inherit">
                        Projects
                    </Button>
                    <Button href="/" color="inherit">
                        Science
                    </Button>
                    <Button href="/" color="inherit">
                        Contact
                    </Button>
                    <Box flexGrow={1}/>
                    {
                        user === null ?
                            <div>
                                <Button href="/" color="inherit">
                                    Log in
                                </Button>
                                <Button href="/" color="inherit">
                                    Register
                                </Button>
                            </div>
                            :
                            <div>
                                <Button href="/profile" color="inherit">
                                    Profile
                                </Button>
                                <Button color="inherit" onClick={this.onLogOut}>
                                    Log out
                                </Button>
                            </div>
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header

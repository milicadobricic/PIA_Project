import * as React from 'react';
import {AppBar, Box, Button, Menu, MenuItem, Toolbar} from "@material-ui/core";
import LocalStorageService from "../../services/LocalStorageService";

type HeaderState = {
    menuOpen: boolean
}

class Header extends React.Component<any, HeaderState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            menuOpen: false
        };
    }


    public onLogOut = () => {
        LocalStorageService.removeUser();
        window.location.href = "/";
    }

    public onOpenMenu = () => {
        this.setState({
            menuOpen: true
        })
    }

    public onCloseMenu = () => {
        this.setState({
            menuOpen: false
        })
    }

    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let user = LocalStorageService.getUser();

        return(
            <AppBar color="primary" position="static">
                <Toolbar variant="dense">
                    <Button href="/" color="inherit">
                        Home
                    </Button>
                    <Button href="/employees" color="inherit">
                        Employees
                    </Button>
                    <Button href="/" color="inherit">
                        News
                    </Button>
                    <Button id="menu-button" color="inherit" onClick={this.onOpenMenu}>
                        Bachelor studies
                    </Button>
                    <Menu
                        open={this.state.menuOpen}
                        anchorEl={document.getElementById("menu-button")}
                        onClose={this.onCloseMenu}
                    >
                        <MenuItem onClick={() => window.location.href = "/bachelor/si"}>
                            Software engineering
                        </MenuItem>
                        <MenuItem onClick={() => window.location.href = "/bachelor/is"}>
                            Computer Engineering and Information Theory
                        </MenuItem>
                        <MenuItem onClick={() => window.location.href = "/bachelor/others"}>
                            Other departments
                        </MenuItem>
                    </Menu>
                    <Button href="/master" color="inherit">
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
                    {
                        user?.userType === "admin" && <div>
                            <Button href="/dashboard" color="inherit">
                                Dashboard
                            </Button>
                        </div>
                    }
                    <Box flexGrow={1}/>
                    {
                        user === null ?
                            <div>
                                <Button href="/" color="inherit">
                                    Log in
                                </Button>
                                <Button href="/register" color="inherit">
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

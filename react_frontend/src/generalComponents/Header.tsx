import * as React from 'react';
import {AppBar, Button, Grid, Toolbar} from "@material-ui/core";

class Header extends React.Component<any, any>{
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
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
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header

import * as React from 'react';
import {AppBar, Button, Grid, Toolbar} from "@material-ui/core";

class Header extends React.Component<any, any>{
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <AppBar color="primary" position="static">
                <Toolbar variant="dense">
                    <Grid container direction="row">
                        <Grid item md={6}>
                            <Button href="/" color="inherit">
                                Home
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header
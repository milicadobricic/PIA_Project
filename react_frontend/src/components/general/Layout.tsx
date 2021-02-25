import * as React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {Box, Divider, Grid} from "@material-ui/core";
import LocalStorageService from "../../services/LocalStorageService";
import UpdatePasswordPage from "../profile/UpdatePasswordPage";

const margin: number = 1;

class Layout extends React.Component<any, any>{
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let user = LocalStorageService.getUser();

        return(
            <Grid container direction="column">
                <Grid item>
                    <Header/>
                </Grid>
                <Grid item>
                    <Box m={margin}>
                        {
                            user && !user.isValidPassword ? <UpdatePasswordPage /> : this.props.children
                        }
                    </Box>
                    <Divider/>
                </Grid>
                <Grid>
                    <Box m={margin}>
                        <Footer/>
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default Layout

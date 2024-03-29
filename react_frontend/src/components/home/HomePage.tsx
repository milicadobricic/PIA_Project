import * as React from 'react';
import {Box, Grid, Paper} from "@material-ui/core";
import LoginForm from "./LoginForm";
import GeneralInfo from "./GeneralInfo";
import LocalStorageService from "../../services/LocalStorageService";
import UserBasicInfo from "./UserBasicInfo";

const outerPadding: number = 3;
const elevation: number = 5;
const innerPadding: number = 3;

class HomePage extends React.Component<any, any>{
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let user = LocalStorageService.getUser();

        return (
            <div>
                <Grid container direction="row">
                    <Grid item md={8}>
                        <Box p={outerPadding}>
                            <Paper elevation={elevation}>
                                <Box p={innerPadding}>
                                    <GeneralInfo />
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <Box p={outerPadding}>
                            <Paper elevation={elevation}>
                                <Box p={innerPadding}>
                                    {
                                        user === null ? <LoginForm /> : <UserBasicInfo user={user} />
                                    }
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default HomePage;

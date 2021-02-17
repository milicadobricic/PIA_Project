import * as React from 'react';
import {Grid} from "@material-ui/core";
import LoginForm from "./LoginForm";

class HomePage extends React.Component<any, any>{
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div>
                <Grid container direction="row">
                    <Grid item md={8}>
                        General info
                    </Grid>
                    <Grid item md={4}>
                        <LoginForm />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default HomePage

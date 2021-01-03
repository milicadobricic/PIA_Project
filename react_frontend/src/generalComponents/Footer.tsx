import * as React from 'react';
import {Typography} from "@material-ui/core";

class Footer extends React.Component<any, any>{
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                <Typography>
                    Author: Milica Dobricic
                </Typography>
            </div>
        )
    }
}

export default Footer
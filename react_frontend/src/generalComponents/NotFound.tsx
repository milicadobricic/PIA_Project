import * as React from 'react';
import {Alert} from "@material-ui/lab";

class NotFound extends React.Component<any, any> {
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Alert severity="error">
                Page not found!
            </Alert>
        )
    }
}

export default NotFound
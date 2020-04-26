import * as React from 'react';

class NotFound extends React.Component<any, any> {
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div>
                Not found!
            </div>
        )
    }
}

export default NotFound
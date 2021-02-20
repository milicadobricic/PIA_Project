import * as React from 'react';
import Layout from "./components/general/Layout";

class App extends React.Component<any, any>{
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <Layout>
                {this.props.children}
            </Layout>
        )
    }
}

export default App

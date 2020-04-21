import * as React from 'react';
import Header from "./Header";
import Footer from "./Footer";

class Layout extends React.Component<any, any>{
    public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return(
            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}

export default Layout
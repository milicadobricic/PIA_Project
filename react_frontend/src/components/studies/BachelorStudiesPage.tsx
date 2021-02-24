import * as React from "react";
import ApiService from "../../services/ApiService";
import {Class} from "../../model/Class";

type PageState = {
    classes?: Array<Class>
}

class BachelorStudiesPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            classes: undefined
        }
    }

    public async componentDidMount() {//others
        let department = this.props.match.params.department;
        let classes = await ApiService.classes(department.toUpperCase());
        this.setState({
            classes
        });
    }

    public render() {
        console.log(this.state.classes);
        return (
            <div>
            </div>
        )
    }
}

export default BachelorStudiesPage;

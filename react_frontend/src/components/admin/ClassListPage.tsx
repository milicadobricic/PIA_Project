import * as React from "react";
import {Class} from "../../model/Class";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";
import {Typography} from "@material-ui/core";
import ClassList from "./ClassList";

type PageState = {
    classes?: Class[],
    message?: string,
    success: boolean
}

class ClassListPage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            classes: undefined,
            message: undefined,
            success: true
        };
    }

    public async componentDidMount() {
        let classes = await ApiService.classes();
        this.setState({
            classes
        });
    }

    public onDelete = async (classInfo: Class) => {
        this.setState({
            classes: undefined,
        })

        await ApiService.deleteClass(classInfo);

        let classes = await ApiService.classes();
        this.setState({
            classes
        })
    };

    public render() {
        console.log(this.state.classes);
        if (this.state.classes === undefined) {
            return (
                <Alert severity="info">
                    <Typography>
                        Loading...
                    </Typography>
                </Alert>
            )
        }

        return(
            <div>
                <ClassList classes={this.state.classes} enableDelete={true} onDelete={this.onDelete} />
                {
                    this.state.message && <div>
                        <Alert severity={this.state.success ? "info" : "error"}>
                            {this.state.message}
                        </Alert>
                    </div>
                }
            </div>
        )
    }
}

export default ClassListPage;

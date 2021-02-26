import * as React from "react";
import {Box, Paper} from "@material-ui/core";
import ClassTabs from "./ClassTabs";
import ClassMaterials from "./ClassMaterials";

class LecturesPage extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Box p={3} className="class_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <ClassTabs index={2} classId={this.props.match.params.id} />
                            <ClassMaterials classId={this.props.match.params.id} type="lecture" title="Lectures" />
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default LecturesPage;

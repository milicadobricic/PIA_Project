import * as React from "react";
import ClassTabs from "./ClassTabs";
import {Box, Paper} from "@material-ui/core";
import ClassMaterials from "./ClassMaterials";

class PracticalLessonsPage extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Box p={3} className="class_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <ClassTabs index={6} classId={this.props.match.params.id} />
                            <ClassMaterials classId={this.props.match.params.id} type="practical" title="Practical lessons" />
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default PracticalLessonsPage;

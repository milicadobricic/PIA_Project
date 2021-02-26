import * as React from "react";
import {Box, Paper} from "@material-ui/core";
import ClassTabs from "./ClassTabs";
import ClassMaterials from "./ClassMaterials";

class ExercisesPage extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Box p={3} className="class_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <ClassTabs index={3} classId={this.props.match.params.id} />
                            <ClassMaterials classId={this.props.match.params.id} type="exercise" title="Exercises" />
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default ExercisesPage;

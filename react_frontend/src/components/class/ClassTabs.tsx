import * as React from "react";
import {Tab, Tabs} from "@material-ui/core";

type TabsProps = {
    index: number,
    classId: string
}

class ClassTabs extends React.Component<TabsProps, any>{
    public render() {
        return (
            <Tabs value={this.props.index} variant="fullWidth">
                <Tab label="Info" href={"/class/info/" + this.props.classId} />
                <Tab label="Notifications" href={"/class/notifications/" + this.props.classId} />
            </Tabs>
        )
    }
}

export default ClassTabs;

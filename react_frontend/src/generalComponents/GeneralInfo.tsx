import * as React from "react";
import {Box, Paper, Typography} from "@material-ui/core";

class GeneralInfo extends React.Component<any, any> {
    public render() {
        return (
            <Box p={3}>
                <Paper elevation={5}>
                    <Box p={3}>
                        <Typography variant="h3" align="center">
                            The Department of Computer Science and Information Technology
                        </Typography>
                        <Box pt={3}>
                            <Typography>
                                The Department of Computer Science and Information Technology provides education, research and projects in the area of computer hardware, software and networks.
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        )
    }
}

export default GeneralInfo;

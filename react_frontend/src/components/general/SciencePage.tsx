import * as React from "react";
import {Link, Typography} from "@material-ui/core";

class SciencePage extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Typography align="center" variant="h2">
                    Research
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
                <Typography>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </Typography>
                <Typography align="center" variant="h2">
                    Projects
                </Typography>
                <Link href="https://doi.org/10.2298/CSIS200901054S">
                    <Typography>
                        Students' Preferences in Selection of Computer Science and Informatics Studies - A Comprehensive Empirical Case Study
                    </Typography>
                </Link>
                <Link href="https://doi.org/10.1007/s00500-020-05554-8">
                    <Typography>
                        An improved adaptive hybrid firefly differential evolution algorithm for passive target localization
                    </Typography>
                </Link>
                <Link href="https://doi.org/10.1155/2021/8887445">
                    <Typography>
                        Two-Stage Precoding Based on Overlapping User Grouping Approach in IoT-Oriented 5G MU-MIMO Systems
                    </Typography>
                </Link>
            </div>
        )
    }
}

export default SciencePage;

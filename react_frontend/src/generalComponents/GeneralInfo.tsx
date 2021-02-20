import * as React from "react";
import {Box, Typography} from "@material-ui/core";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../App.scss';
import picture1 from './../images/1.jpg';
import picture2 from './../images/2.jpg';
import picture3 from './../images/3.jpg';

class GeneralInfo extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Typography variant="h3" align="center">
                    The Department of Computer Science and Information Technology
                </Typography>
                <Box pt={3}>
                    <Typography>
                        The Department of Computer Science and Information Technology provides education, research and projects in the area of computer hardware, software and networks.
                    </Typography>
                </Box>
                <Box pt={3}>
                    <Carousel>
                        <div>
                            <img alt="ETF1" src={picture1} className="carousel_image"/>
                        </div>
                        <div>
                            <img alt="ETF2" src={picture2} className="carousel_image"/>
                        </div>
                        <div>
                            <img alt="ETF3" src={picture3} className="carousel_image"/>
                        </div>
                    </Carousel>
                </Box>
            </div>
        )
    }
}

export default GeneralInfo;

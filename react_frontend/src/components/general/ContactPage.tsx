import * as React from "react";
import {Box, Divider, Grid, Paper, Table, TableCell, TableRow, Typography} from "@material-ui/core";

class ContactPage extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Typography variant="h2" align="center">
                    Contact
                </Typography>
                <Divider />
                <Box pt={2} />
                <Grid container direction="row">
                    <Grid item md={6}>
                        <Box className="contact_page">
                            <Paper elevation={3}>
                                <Table>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h4">
                                                Office of the dean
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                phone: +381113248464
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                fax: +381113248681
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                email: dekanat@etf.bg.ac.rs
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </Table>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Box className="contact_page">
                            <Paper elevation={3}>
                                <Table>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h4">
                                                Student service
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                Contact peson: Dragana Trenevski
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                phone: +38113226760
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                email: stud_sluzba@etf.bg.ac.rs
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </Table>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                <Box pt={2} />
                <Grid container direction="row">
                    <Grid item md={6}>
                        <Box className="contact_page">
                            <Paper elevation={3}>
                                <Table>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h4">
                                                General administration
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                Contact person: Miloš Nalović
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                phone: +38113226992
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                email: opsta_sluzba@etf.bg.ac.rs
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </Table>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Box className="contact_page">
                            <Paper elevation={3}>
                                <Table>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="h4">
                                                Accounting
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                Contact person: Mirjana Vlajković
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                phone: +38113370146
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>
                                                fax: +3813370077
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </Table>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ContactPage;

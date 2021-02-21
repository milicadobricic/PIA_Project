import * as React from "react";
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Table,
    TableCell,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import LocalStorageService from "../../services/LocalStorageService";
import ApiService from "../../services/ApiService";
import {Alert} from "@material-ui/lab";

type PageState = {
    updating: boolean,
    success: boolean,
    message?: string,
};

class EditProfilePage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            updating: false,
            success: true,
            message: undefined,
        };
    }

    public onConfirm = async () => {
        let username = LocalStorageService.getUser().username;

        let addressInput = document.getElementById("addressInput") as HTMLInputElement;
        let phoneNumberInput = document.getElementById("phoneNumberInput") as HTMLInputElement;
        let officeNumberInput = document.getElementById("officeNumberInput") as HTMLInputElement;
        let biographyInput = document.getElementById("biographyInput") as HTMLInputElement;
        let address = addressInput.value;
        let phoneNumber = phoneNumberInput.value;
        let office = officeNumberInput.value;
        let biography = biographyInput.value;

        this.setState({
            updating: true,
            message: undefined,
        });

        let response = await ApiService.updateUser(username, address, phoneNumber, office, biography);
        if (response.user) {
            LocalStorageService.setUser(response.user);
        }

        this.setState({
            updating: false,
            success: response.success,
            message: response.message,
        });
    }

    public render() {
        let user = LocalStorageService.getUser();

        return (
            <div>
                <Box p={3} className="edit_profile_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Table>
                                <TableRow>
                                    <TableCell>
                                        <Typography component="div" variant="h6">
                                            Editing profile: <Typography variant="h6" color="primary" display="inline">{user.username}</Typography>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField id="addressInput" defaultValue={user.employeeInfo?.address} variant="outlined" size="small" label="Address" fullWidth={true} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField id="phoneNumberInput" defaultValue={user.employeeInfo?.phoneNumber} variant="outlined" size="small" label="Phone number" fullWidth={true} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField id="officeNumberInput" defaultValue={user.employeeInfo?.officeNumber} variant="outlined" size="small" label="Office number" fullWidth={true} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField id="biographyInput" defaultValue={user.employeeInfo?.biography} variant="outlined" size="small" label="Biography" fullWidth={true} multiline rows={4} />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {
                                            this.state.updating ? <div>
                                                <CircularProgress />
                                            </div> : <div>
                                                <Button variant="contained" fullWidth={true} onClick={this.onConfirm}>Confirm</Button>
                                            </div>
                                        }
                                    </TableCell>
                                </TableRow>
                            </Table>
                            {
                                this.state.message && <div>
                                    <Alert severity={this.state.success ? "info" : "error"}>
                                        <Typography>
                                            {this.state.message}
                                        </Typography>
                                    </Alert>
                                </div>
                            }
                        </Box>
                    </Paper>
                </Box>
            </div>
        )
    }
}

export default EditProfilePage;

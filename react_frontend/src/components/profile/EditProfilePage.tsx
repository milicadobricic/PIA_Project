import * as React from "react";
import {
    Box,
    Button,
    CircularProgress, Grid,
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

    profilePicture?: string,
};

class EditProfilePage extends React.Component<any, PageState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            updating: false,
            success: true,
            message: undefined,

            profilePicture: LocalStorageService.getUser().employeeInfo?.profilePicture,
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

        let response = await ApiService.updateUser(username, address, phoneNumber, office, biography, this.state.profilePicture);
        if (response.user) {
            LocalStorageService.setUser(response.user);
        }

        this.setState({
            updating: false,
            success: response.success,
            message: response.message,
        });
    }

    public onFinishedUpload = (event: any) => {
        let content = event.target.result;
        let base64 = btoa(content);
        this.setState({
            profilePicture: "data:image/png;base64," + base64
        });
    }

    public onUpload = () => {
        let fileInputElement = document.getElementById("fileUpload") as HTMLInputElement;

        if(fileInputElement !== null && fileInputElement.files !== null) {
            if (fileInputElement.files[0]) {
                let file = fileInputElement.files[0];
                let reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = this.onFinishedUpload;
            }
        }
    }

    public render() {
        let user = LocalStorageService.getUser();

        return (
            <div>
                <Box p={3} className="edit_profile_page">
                    <Paper elevation={5}>
                        <Box p={3}>
                            <Grid container direction="row">
                                <Grid item md={8}>
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
                                </Grid>
                                <Grid item md={4}>
                                    <div>
                                        {
                                            this.state.profilePicture && <div>
                                                <img className="edit_profile_image" src={this.state.profilePicture} alt=""/>
                                            </div>
                                        }
                                        <form id="uploadFormId" className="form">
                                            <Button variant="contained" component="label" fullWidth={true}>
                                                Upload picture
                                                <input
                                                    id="fileUpload"
                                                    type="file"
                                                    style={{ display: "none" }}
                                                    onChange={this.onUpload}
                                                />
                                            </Button>
                                        </form>
                                    </div>
                                </Grid>
                            </Grid>
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

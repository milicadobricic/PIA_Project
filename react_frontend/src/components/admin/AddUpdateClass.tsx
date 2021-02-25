import * as React from "react";
import {Class} from "../../model/Class";
import ApiService from "../../services/ApiService";
import {
    Button,
    FormControlLabel,
    Grid,
    IconButton,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {Add, Delete} from "@material-ui/icons";

type ClassProps = {
    classInfo: Class,
}

type ClassState = {
    classInfo: Class,
    success: boolean,
    message?: string,
}

class AddUpdateClass extends React.Component<ClassProps, ClassState> {
    public constructor(props: ClassProps) {
        super(props);
        this.state = {
            classInfo: props.classInfo,
            success: true,
            message: undefined
        };
    }

    public componentDidMount() {
        this.setState({
            classInfo: this.props.classInfo
        });
    }

    public componentDidUpdate(prevProps: Readonly<ClassProps>, prevState: Readonly<ClassState>, snapshot?: any) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.setState({
                classInfo: this.props.classInfo
            });
        }
    }

    public onUpdate = (key: string, event: any) => {
        let classInfo = this.state.classInfo;

        // @ts-ignore
        classInfo[key] = event.target.value;
        this.setState({
            classInfo
        });
    }

    public onMandatoryUpdate = (event: any) => {
        let classInfo = this.state.classInfo;
        classInfo.mandatory = event.target.checked;
        this.setState({
            classInfo
        });
    }

    public onAddCode = () => {
        let classInfo = this.state.classInfo;
        classInfo.codes.push({
            department: 'SI',
            group: 'SI',
            year: 1,
            semester: 1,
            subject: ''
        });

        this.setState({
            classInfo
        })
    }

    public onUpdateCode = (key: string, index: number, event: any) => {
        let classInfo = this.state.classInfo;

        // @ts-ignore
        classInfo.codes[index][key] = event.target.value;
        if (key === "department") {
            let department = event.target.value;
            classInfo.codes[index].group = department === "SI" || department === "IR" || department === "MA" ? department : "OTHERS";
        }

        if (key === "semester") {
            classInfo.codes[index].year = Math.floor((event.target.value - 1) / 2) + 1;
        }

        this.setState({
            classInfo
        });
    }

    public onDeleteCode = (index: number) => {
        let classInfo = this.state.classInfo;
        classInfo.codes.splice(index, 1);
        this.setState({
            classInfo
        });
    }

    public onConfirm = async () => {
        let response = await ApiService.addUpdateClass(this.state.classInfo);

        this.setState({
            success: response.success,
            message: response.message
        });
    }

    public render() {
        return (
            <div>
                <Grid container direction="row">
                    <Grid item md={7}>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdate("name", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Name"
                                            value={this.state.classInfo.name}
                                            size="small"
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <FormControlLabel
                                            control={<Switch checked={this.state.classInfo.mandatory} onChange={this.onMandatoryUpdate} name="mandatory" />}
                                            label="Mandatory"
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdate("classesPerWeek", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Classes per week"
                                            value={this.state.classInfo.classesPerWeek}
                                            size="small"
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdate("credits", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Credits"
                                            value={this.state.classInfo.credits}
                                            size="small"
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdate("requirements", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Requirements"
                                            value={this.state.classInfo.requirements}
                                            size="small"
                                            multiline
                                            rows={4}
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdate("goal", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Goal"
                                            value={this.state.classInfo.goal}
                                            size="small"
                                            multiline
                                            rows={4}
                                            required
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TextField
                                            onChange={event => this.onUpdate("description", event)}
                                            fullWidth={true}
                                            variant="outlined"
                                            label="Description"
                                            value={this.state.classInfo.description}
                                            size="small"
                                            multiline
                                            rows={4}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item md={5}>
                        <Grid container direction="column">
                            <Grid item>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="h6">
                                                    Codes
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.classInfo.codes.map((code, index) =>
                                            <TableRow>
                                                <TableCell>
                                                    <Grid container direction="row">
                                                        <Grid item md={4}>
                                                            <TextField
                                                                onChange={event => this.onUpdateCode("department", index, event)}
                                                                fullWidth={true}
                                                                variant="outlined"
                                                                label="Department"
                                                                value={code.department}
                                                                size="small"
                                                                required
                                                            />
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <TextField
                                                                onChange={event => this.onUpdateCode("semester", index, event)}
                                                                fullWidth={true}
                                                                variant="outlined"
                                                                label="Semester"
                                                                value={code.semester}
                                                                size="small"
                                                                required
                                                                type="number"
                                                            />
                                                        </Grid>
                                                        <Grid item md={4}>
                                                            <TextField
                                                                onChange={event => this.onUpdateCode("subject", index, event)}
                                                                fullWidth={true}
                                                                variant="outlined"
                                                                label="Subject"
                                                                value={code.subject}
                                                                size="small"
                                                                required
                                                            />
                                                        </Grid>
                                                        <Grid item md={1}>
                                                            <IconButton onClick={() => this.onDeleteCode(index)}>
                                                                <Delete />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        <TableRow>
                                            <TableCell>
                                                <IconButton onClick={this.onAddCode}>
                                                    <Add />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Button variant="contained" fullWidth={true} onClick={this.onConfirm}>
                    Confirm
                </Button>
                {
                    this.state.message && <div>
                        <Alert severity={this.state.success ? "info" : "error"}>
                            {this.state.message}
                        </Alert>
                    </div>
                }
            </div>
        )
    }
}

export default AddUpdateClass;

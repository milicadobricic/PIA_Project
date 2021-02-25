import * as React from "react";
import {Alert} from "@material-ui/lab";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    IconButton,
    Link,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {Class} from "../../model/Class";

type PageProps = {
    classes: Class[],
    enableDelete: boolean,
    onDelete?: (classInfo: Class) => void,
}

type PageState = {
    classToDelete?: Class
}

class ClassList extends React.Component<PageProps, PageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            classToDelete: undefined,
        };
    }

    static defaultProps = {
        onDelete: undefined
    };

    public onDelete = (classInfo: Class) => {
        this.setState({
            classToDelete: classInfo,
        })
    };

    public onDeleteConfirm = async () => {
        let classToDelete = this.state.classToDelete;

        this.setState({
            classToDelete: undefined,
        })

        // @ts-ignore
        this.props.onDelete(classToDelete);
    };

    public render() {
        if (this.props.classes.length === 0) {
            return (
                <Alert severity="info">
                    <Typography>
                        {
                            this.props.enableDelete ?
                                "There are no any classes!"
                            :   "There are no any classes assigned to you!"
                        }
                    </Typography>
                </Alert>
            )
        }

        return (
            <div>
                <Table size="small">
                    <TableBody>
                        {
                            this.props.classes.map(classInfo =>
                                <TableRow>
                                    <TableCell>
                                        <Typography align="center">
                                            {
                                                this.props.enableDelete &&
                                                <IconButton size="small" onClick={() => this.onDelete(classInfo)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            }
                                            <Link href={"/edit-class/" + classInfo.id}>
                                                {classInfo.name}
                                            </Link>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
                <Dialog open={!!this.state.classToDelete} onClose={() => this.setState({classToDelete: undefined})}>
                    <DialogContent>
                        Are you sure you want to delete class {this.state.classToDelete?.name}?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.onDeleteConfirm}>Confirm</Button>
                        <Button variant="contained" onClick={() => this.setState({classToDelete: undefined})}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ClassList;

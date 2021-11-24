import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import NewPackageDialog from "../components/NewPackageDialog";
import VisibleBlock from "../components/VisibleBlock";
import { packageAdd, packageRemove, packageReorder } from "../store/workSlice";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

function PackagePage() {
    const dispatch = useDispatch();
    const packages = useSelector((state) => state.work.packages);
    const customers = useSelector((state) => state.work.customers);

    const [dialog, setDialog] = useState(false);

    const addHandler = useCallback(
        (pack) => {
            dispatch(packageAdd(pack));
            setDialog(false);
        },
        [dispatch],
    );

    return (
        <>
            <NewPackageDialog
                customers={customers}
                open={dialog}
                onClose={() => setDialog(false)}
                onAdd={addHandler}
            />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Price</TableCell>

                            <TableCell>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={() => setDialog(true)}
                                >
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packages.map((row, i) => {
                            const customer = customers.find(
                                (x) => x.id === row.customerid,
                            );

                            const isFirst = i === 0;
                            const isLast = i === packages.length - 1;

                            if (!customer) {
                                return null
                            }

                            return (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>

                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{row.weight}</TableCell>
                                    <TableCell>{row.price}</TableCell>

                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                dispatch(packageRemove(row.id))
                                            }
                                        >
                                            Delete
                                        </Button>

                                        <VisibleBlock hide={isLast}>
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    dispatch(
                                                        packageReorder({
                                                            packId: row.id,
                                                            direction: "down",
                                                        }),
                                                    )
                                                }
                                            >
                                                <ArrowDownwardIcon />
                                            </IconButton>
                                        </VisibleBlock>

                                        <VisibleBlock hide={isFirst}>
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    dispatch(
                                                        packageReorder({
                                                            packId: row.id,
                                                            direction: "up",
                                                        }),
                                                    )
                                                }
                                            >
                                                <ArrowUpwardIcon />
                                            </IconButton>
                                        </VisibleBlock>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default PackagePage;

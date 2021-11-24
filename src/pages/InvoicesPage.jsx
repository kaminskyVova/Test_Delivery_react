import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom'
import useInvoices from "../hooks/useInvoices";

function InvoicesPage() {
    const customerid = parseInt(useParams().customerid, 10)

    const customers = useSelector((state) => state.work.customers);
    const packages = useSelector((state) => state.work.packages);
    const invoices = useInvoices(customers, packages);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Total Weight</TableCell>
                        <TableCell>Total Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map((row) => {
                        let style = {}

                        if (row.customer.id === customerid) {
                            style.background = '#dedeff'
                        }

                        return (
                            <TableRow
                                key={row.customer.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                                style={style}
                            >
                                <TableCell>{row.customer.name}</TableCell>
                                <TableCell>{row.totalWeight}kg</TableCell>
                                <TableCell>{row.totalPrice}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default InvoicesPage;

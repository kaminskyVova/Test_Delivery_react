import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    MenuItem,
    TextField,
    FormControl,
    Select,
    InputLabel,
    Stack,
    Button,
} from "@mui/material";
import { useState, useMemo, useCallback } from "react";

const targetToInt = (event) => parseInt(event.target.value, 10);

const NewPackageDialog = (props) => {
    const { onAdd } = props;

    const [weight, setWeight] = useState(1);
    const [customerid, setCustomerid] = useState(0);
    const [price, setPrice] = useState(100);

    const addAble = useMemo(
        () => Boolean(weight > 0 && customerid && price > 0),
        [weight, customerid, price],
    );

    const sendPackage = useCallback(() => {
        const pack = { weight: `${weight}kg`, customerid, price };
        onAdd(pack);
    }, [weight, customerid, price, onAdd]);

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>New package</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        value={weight}
                        type="number"
                        label="Weight"
                        variant="standard"
                        onChange={(e) => setWeight(targetToInt(e))}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Customer</InputLabel>
                        <Select
                            value={customerid}
                            label="Customer"
                            variant="standard"
                            onChange={(e) => setCustomerid(targetToInt(e))}
                        >
                            {props.customers.map((customer) => (
                                <MenuItem key={customer.id} value={customer.id}>
                                    {customer.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        value={price}
                        type="number"
                        label="Price"
                        variant="standard"
                        onChange={(e) => setPrice(targetToInt(e))}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={props.onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    disabled={!addAble}
                    color="primary"
                    onClick={sendPackage}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewPackageDialog;

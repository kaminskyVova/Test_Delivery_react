import { createSlice } from "@reduxjs/toolkit";

const getInitState = () => ({
    loading: false,
    customers: [],
    packages: [],
});

export const workSlice = createSlice({
    name: "work",

    initialState: getInitState(),

    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },

        setState(state, action) {
            Object.assign(state, action.payload);

            state.packages = state.packages.sort(
                (a, b) => a.shippingOrder - b.shippingOrder,
            );
        },

        customerRemove(state, action) {
            state.customers = state.customers.filter(
                (customer) => customer.id !== action.payload,
            );
        },

        packageRemove(state, action) {
            state.packages = state.packages.filter(
                (pack) => pack.id !== action.payload,
            );
        },

        packageAdd(state, action) {
            const pack = { ...action.payload };

            const ids = state.packages.map((x) => parseInt(x.id.slice(3), 10));
            const maxId = Math.max(...ids);
            pack.id = `pak${maxId + 1}`;

            const shippingOrders = state.packages.map((x) => x.shippingOrder);
            const maxShippingOrder = Math.max(...shippingOrders);
            pack.shippingOrder = maxShippingOrder + 1;

            state.packages.push(pack);
        },

        packageReorder(state, action) {
            const { packId, direction } = action.payload;

            const packIndex = state.packages.findIndex(
                (pack) => pack.id === packId,
            );
            const pack = state.packages[packIndex];
            const packSibling =
                state.packages[packIndex + (direction === "up" ? -1 : 1)];

            const buff = pack.shippingOrder;
            pack.shippingOrder = packSibling.shippingOrder;
            packSibling.shippingOrder = buff;

            state.packages = state.packages.sort(
                (a, b) => a.shippingOrder - b.shippingOrder,
            );
        },
    },
});

const { setLoading, setState } = workSlice.actions;

export const { customerRemove, packageAdd, packageRemove, packageReorder } =
    workSlice.actions;

export default workSlice.reducer;

export const download = () => async (dispatch) => {
    dispatch(setLoading(true));

    const response = await fetch("/data.json");
    const json = await response.json();

    dispatch(setState(json));
    dispatch(setLoading(false));
};

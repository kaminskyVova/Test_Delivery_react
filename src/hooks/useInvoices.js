import { useMemo } from "react";

const useInvoices = (customers, packages) =>
    useMemo(
        () =>
            customers.map((customer) => {
                const customerPacks = packages.filter(
                    (pack) => pack.customerid === customer.id,
                );

                const totalWeight = customerPacks
                    .map((pack) => parseInt(pack.weight.slice(0, -2), 10))
                    .reduce((a, b) => a + b, 0);
                const totalPrice = customerPacks
                    .map((pack) => pack.price)
                    .reduce((a, b) => a + b, 0);

                return {
                    customer,
                    totalWeight,
                    totalPrice,
                };
            }),
        [customers, packages],
    );

export default useInvoices;

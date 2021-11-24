import { useMemo } from "react";

const VisibleBlock = ({ show, hide, children }) => {
    const mode = useMemo(() => {
        if (show !== undefined) {
            return Boolean(show);
        }

        if (hide !== undefined) {
            return !Boolean(hide);
        }

        return true;
    }, [show, hide]);

    return mode ? children : null;
};

export default VisibleBlock;

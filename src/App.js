import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import CustomerPage from "./pages/CustomerPage";
import InvoicesPage from "./pages/InvoicesPage";
import PackagePage from "./pages/PackagePage";
import { download } from "./store/workSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(download());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/customer" exact>
          <CustomerPage />
        </Route>

        <Route path="/invoices" exact>
          <InvoicesPage />
        </Route>

        <Route path="/invoices/:customerid" exact>
          <InvoicesPage />
        </Route>

        <Route path="/package" exact>
          <PackagePage />
        </Route>

        <Route path="*">
          <Redirect to="/customer" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

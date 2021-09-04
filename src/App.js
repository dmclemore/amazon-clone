import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Header from "./Header";
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";
import Checkout from "./Checkout";
import Orders from "./Orders";

// Public stripe key
const promise = loadStripe(
    "pk_test_51JVfTmFSTiEYf6jzs5VTSNrUvwc2scAfFJuxaFoOCBAzuD8mXeTdl7Uit2OHrZ01Cnb0DftiqVyPKY6wTayz2kXe00BPeutian"
);

const App = () => {
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                dispatch({
                    type: "SET_USER",
                    user: user,
                });
            } else {
                dispatch({
                    type: "SET_USER",
                    user: null,
                });
            }
        });
    }, [user]);

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/cart">
                        <Header />
                        <Cart />
                    </Route>
                    <Route path="/checkout">
                        <Header />
                        <Elements stripe={promise}>
                            <Checkout />
                        </Elements>
                    </Route>
                    <Route path="/orders">
                        <Header />
                        <Orders />
                    </Route>
                    <Route path="/">
                        <Header />
                        <Home />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;

import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

const App = () => {
    const [{}, dispatch] = useStateValue();

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
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/checkout">
                        <Header />
                        <Checkout />
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

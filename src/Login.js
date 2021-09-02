import "./Login.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = e => {
        e.preventDefault();
        // firebase login
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                if (res) {
                    history.push("/");
                }
            })
            .catch(error => alert(error.message));
    };

    const register = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                if (res) {
                    history.push("/");
                }
            })
            .catch(error => alert(error.message));
    };

    return (
        <div className="Login">
            <Link to="/">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt="Amazon"
                    className="Login-logo"
                />
            </Link>
            <div className="Login-container">
                <h1 className="Login-title">Sign In</h1>
                <form>
                    <h5>Email</h5>
                    <input
                        type="text"
                        className="Login-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <h5>Password</h5>
                    <input
                        type="password"
                        className="Login-input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        className="Login-signinButton"
                        onClick={signIn}
                        type="submit"
                    >
                        Sign In
                    </button>
                </form>
                <p className="Login-terms">
                    By continuing, you agree to Amazon Clone's Conditions of Use
                    and Privacy Notice.
                </p>
            </div>
            <div className="Login-newContainer">
                <h5 className="Login-newTitle">New to Amazon?</h5>
                <button className="Login-newButton" onClick={register}>
                    Create an Account
                </button>
            </div>
        </div>
    );
};
export default Login;

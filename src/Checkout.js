import "./Checkout.css";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./helpers/StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getCartTotal } from "./helpers/reducer";
import { db } from "./helpers/firebase";
import axios from "./helpers/axios";
import CurrencyFormat from "react-currency-format";
import CartProduct from "./products/CartProduct";

const Checkout = () => {
    const [{ user, cart }, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    useEffect(() => {
        if (user) {
            const userData = db.collection("users").doc(user?.uid);
            userData.get().then(doc => {
                if (doc.data()) {
                    setFirstName(doc.data().firstName);
                    setLastName(doc.data().lastName);
                    setStreetAddress(doc.data().streetAddress);
                    setCity(doc.data().city);
                    setState(doc.data().state);
                    setZipCode(doc.data().zipCode);
                }
            });
        }
    }, [user]);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                url: `/payments/create?total=${getCartTotal(cart) * 100}`,
            });
            setClientSecret(response.data.clientSecret);
        };
        getClientSecret();
    }, [cart]);

    const handleSubmit = async event => {
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            })
            .then(({ paymentIntent }) => {
                db.collection("users")
                    .doc(user?.uid)
                    .collection("orders")
                    .doc(paymentIntent.id)
                    .set({
                        cart: cart,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created,
                    });
                setSucceeded(true);
                setError(null);
                setProcessing(false);

                dispatch({
                    type: "EMPTY_CART",
                });
                history.replace("/orders");
            });
    };

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    return (
        <div className="Checkout">
            <div className="Checkout-container">
                <h1>
                    Checkout (
                    <Link to="/cart" className="noDecor">
                        {cart.length} items
                    </Link>
                    )
                </h1>
                <div className="Checkout-section">
                    <div className="Checkout-title">
                        <h3>Review Items And Delivery</h3>
                    </div>
                    <div className="Checkout-items">
                        {cart.map(item => (
                            <CartProduct
                                key={item.id}
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="Checkout-section">
                    <div className="Checkout-title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="Checkout-address">
                        <h5>First Name</h5>
                        <input
                            type="text"
                            className="Profile-input"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <h5>Last Name</h5>
                        <input
                            type="text"
                            className="Profile-input"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                        <h5>Street Address</h5>
                        <input
                            type="text"
                            className="Profile-input"
                            value={streetAddress}
                            onChange={e => setStreetAddress(e.target.value)}
                        />
                        <h5>City</h5>
                        <input
                            type="text"
                            className="Profile-input"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <h5>State</h5>
                        <input
                            type="text"
                            className="Profile-input"
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                        <h5>Zip Code</h5>
                        <input
                            type="text"
                            className="Profile-input"
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                        />
                    </div>
                </div>
                <div className="Checkout-section noBottom">
                    <div className="Checkout-title">
                        <h3>Payment</h3>
                    </div>
                    <div className="Checkout-payment">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="Checkout-price">
                                <CurrencyFormat
                                    renderText={value => (
                                        <h3>
                                            Total ({cart.length} items): {value}
                                        </h3>
                                    )}
                                    decimalScale={2}
                                    value={getCartTotal(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                {error && <div>{error}</div>}
                                <button
                                    disabled={
                                        processing || disabled || succeeded
                                    }
                                    className="Checkout-button"
                                >
                                    <span>
                                        {processing
                                            ? "Processing"
                                            : "Submit Order"}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

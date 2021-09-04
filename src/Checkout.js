import "./Checkout.css";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getCartTotal } from "./reducer";
import { db } from "./firebase";
import axios from "./axios";
import CurrencyFormat from "react-currency-format";
import CartProduct from "./CartProduct";

const BASE_URL = "http://localhost:5001/clone-269c4/us-central1/api";

const Checkout = () => {
    const [{ user, cart }, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                url: `${BASE_URL}/payments/create?total=${
                    getCartTotal(cart) * 100
                }`,
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
                        // throws an error. says field value is undefined. fix
                        // cart: cart,
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
                {/* items */}
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
                {/* delivery address */}
                <div className="Checkout-section">
                    <div className="Checkout-title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="Checkout-address">
                        <p>{user?.email}</p>
                        <p>123 Main Street</p>
                        <p>Ann Arbor, MI 48198</p>
                    </div>
                </div>
                {/* payment */}
                <div className="Checkout-section">
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
                                {error && <div>{error}</div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

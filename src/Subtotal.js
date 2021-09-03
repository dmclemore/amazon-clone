import "./Subtotal.css";
import { useStateValue } from "./StateProvider";
import { getCartTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";

const Subtotal = () => {
    const history = useHistory();
    const [{ cart }, dispatch] = useStateValue();

    return (
        <div className="Subtotal">
            <CurrencyFormat
                renderText={value => (
                    <>
                        <p>
                            Subtotal ({cart.length} items):
                            <strong> {value}</strong>
                        </p>
                        <small className="Subtotal-gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button
                onClick={e => history.push("/checkout")}
                className="Subtotal-button"
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default Subtotal;

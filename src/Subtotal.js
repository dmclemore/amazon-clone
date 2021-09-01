import "./Subtotal.css";
import { useStateValue } from "./StateProvider";
import { getCartTotal } from "./reducer";
import CurrencyFormat from "react-currency-format";

const Subtotal = () => {
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
            <button>Proceed to Checkout</button>
        </div>
    );
};

export default Subtotal;

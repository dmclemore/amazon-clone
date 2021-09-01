import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";

const Subtotal = () => {
    return (
        <div className="Subtotal">
            <CurrencyFormat
                renderText={value => (
                    <>
                        <p>
                            Subtotal (0 items):
                            <strong>0</strong>
                        </p>
                        <small className="-Subtotal-gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    );
};

export default Subtotal;

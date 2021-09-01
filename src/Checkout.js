import "./Checkout.css";
import Subtotal from "./Subtotal";

const Checkout = () => {
    return (
        <div className="Checkout">
            <div className="Checkout-left">
                <img
                    className="Checkout-ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                />
                <div>
                    <h2 className="Checkout-title">Your Shopping Basket</h2>
                    {/* BasketItem */}
                </div>
            </div>
            <div className="Checkout-right">
                <Subtotal />
                <h2>The subtotal will go here</h2>
                {/* Subtotal */}
            </div>
        </div>
    );
};

export default Checkout;

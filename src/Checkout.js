import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";

const Checkout = () => {
    const [{ cart }, dispatch] = useStateValue();
    return (
        <div className="Checkout">
            <div className="Checkout-left">
                <img
                    className="Checkout-ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt="Ad"
                />
                <div>
                    <h2 className="Checkout-title">Your Shopping Cart</h2>
                    {cart.map(item => (
                        <CheckoutProduct
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
            <div className="Checkout-right">
                <Subtotal />
            </div>
        </div>
    );
};

export default Checkout;

import "./Cart.css";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";
import CartProduct from "./CartProduct";

const Cart = () => {
    const [{ cart }, dispatch] = useStateValue();
    return (
        <div className="Cart">
            <div className="Cart-left">
                <img
                    className="Cart-ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt="Ad"
                />
                <div>
                    <h2 className="Cart-title">Your Shopping Cart</h2>
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
            <div className="Cart-right">
                <Subtotal />
            </div>
        </div>
    );
};

export default Cart;

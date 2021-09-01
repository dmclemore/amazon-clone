import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";

const CheckoutProduct = ({ id, image, title, price, rating }) => {
    const [{ cart }, dispatch] = useStateValue();

    const removeFromCart = () => {
        dispatch({
            type: "REMOVE_FROM_CART",
            id: id,
        });
    };

    return (
        <div className="CheckoutProduct">
            <img src={image} alt="Product" className="CheckoutProduct-image" />
            <div className="CheckoutProduct-info">
                <p>{title}</p>
                <p className="Checkoutroduct-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="CheckoutProduct-rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>⭐️</p>
                        ))}
                </div>
                <button
                    className="CheckoutProduct-button"
                    onClick={removeFromCart}
                >
                    Remove from Cart
                </button>
            </div>
        </div>
    );
};

export default CheckoutProduct;

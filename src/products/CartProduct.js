import "./CartProduct.css";
import { useStateValue } from "../helpers/StateProvider";

const CartProduct = ({ id, image, title, price, rating, hideButton }) => {
    const [{ cart }, dispatch] = useStateValue();

    const removeFromCart = () => {
        dispatch({
            type: "REMOVE_FROM_CART",
            id: id,
        });
    };

    return (
        <div className="CartProduct">
            <img src={image} alt="Product" className="CartProduct-image" />
            <div className="CartProduct-info">
                <p>{title}</p>
                <p className="Cartroduct-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="CartProduct-rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>⭐️</p>
                        ))}
                </div>
                {!hideButton && (
                    <button
                        className="CartProduct-button"
                        onClick={removeFromCart}
                    >
                        Remove from Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default CartProduct;

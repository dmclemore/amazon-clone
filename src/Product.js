import "./Product.css";
import { useStateValue } from "./StateProvider";

const Product = ({ id, title, price, rating, image }) => {
    const [{ cart }, dispatch] = useStateValue();
    const addToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            item: {
                id: id,
                title: title,
                price: price,
                rating: rating,
                image: image,
            },
        });
    };
    return (
        <div className="Product">
            <div className="Product-info">
                <p>{title}</p>
                <p className="Product-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="Product-rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>⭐️</p>
                        ))}
                </div>
            </div>
            <img src={image} className="Product-image" alt="Product" />
            <button className="Product-button" onClick={addToCart}>
                Add to Cart
            </button>
        </div>
    );
};

export default Product;

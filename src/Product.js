import "./Product.css";

const Product = ({ title, price, rating, image }) => {
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
                            <p>⭐️</p>
                        ))}
                </div>
            </div>
            <img src={image} className="Product-image" />
            <button className="Product-button">Add to Cart</button>
        </div>
    );
};

export default Product;

import "./Order.css";
import moment from "moment";
import CartProduct from "./products/CartProduct";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
    return (
        <div className="Order">
            <h2>Order</h2>
            <p>
                {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
            </p>
            <p className="Order-id">
                <small>{order.id}</small>
            </p>
            {order.data.cart?.map(item => (
                <CartProduct
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}
            <CurrencyFormat
                renderText={value => (
                    <h3 className="Order-total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    );
};

export default Order;

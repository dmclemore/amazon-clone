import "./Orders.css";
import { useState, useEffect } from "react";
import { db } from "./helpers/firebase";
import { useStateValue } from "./helpers/StateProvider";
import Order from "./Order";

const Orders = () => {
    const [{ user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db.collection("users")
                .doc(user?.uid)
                .collection("orders")
                .orderBy("created", "desc")
                .onSnapshot(snapshot => {
                    setOrders(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    );
                });
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <div className="Orders">
            <h1>Orders</h1>
            {console.log(orders)}
            <div className="Orders-order">
                {orders.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    );
};

export default Orders;

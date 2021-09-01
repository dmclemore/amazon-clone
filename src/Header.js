import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const Header = () => {
    return (
        <div className="Header">
            <Link to="/">
                <img
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    className="Header-logo"
                />
            </Link>
            <form className="Header-search">
                <input type="text" className="Header-searchInput" />
                <SearchIcon className="Header-searchIcon" />
            </form>
            <div className="Header-nav">
                <div className="Header-link">
                    <span className="Header-linkLineOne">Hello</span>
                    <span className="Header-linkLineTwo">Sign In</span>
                </div>
                <div className="Header-link">
                    <span className="Header-linkLineOne">Returns</span>
                    <span className="Header-linkLineTwo">& Orders</span>
                </div>
                <div className="Header-link">
                    <span className="Header-linkLineOne">Your</span>
                    <span className="Header-linkLineTwo">Prime</span>
                </div>
                <Link to="/checkout" className="Header-basket">
                    <ShoppingBasketIcon />
                    <span className="Header-linkLineTwo Header-basketCount">
                        0
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Header;

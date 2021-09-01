import "./Home.css";
import Product from "./Product";

const Home = () => {
    return (
        <div className="Home">
            <div className="Home-container">
                <img
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    className="Home-image"
                />

                <div className="Home-row">
                    <Product
                        title="THERMOS FUNTAINER 12 Ounce Stainless Steel Vacuum Insulated Kids Straw Bottle, Pink"
                        price={14.99}
                        rating={5}
                        image="https://m.media-amazon.com/images/I/61D7ssdoY9L._AC_SL1500_.jpg"
                    />
                    <Product
                        title="POP Design, The Hot Seat, Heated Portable Chair, Perfect for Camping, Sports, Beach, and Picnics. USB Heated with Extra-Large Armrests, X-Large Travel Bag, 5 Pockets, Cup Holder, Battery NOT Included"
                        price={129.99}
                        rating={4}
                        image="https://m.media-amazon.com/images/I/71R7U2Csq1L._AC_SL1500_.jpg"
                    />
                </div>

                <div className="Home-row">
                    <Product
                        title="Wyze Cam Spotlight, Wyze Cam v3 Security Camera with Spotlight Kit, 1080p HD Security Camera with Two-Way Audio and Siren, IP65 Weatherproof, Compatible with Alexa and Google Assistant"
                        price={49.99}
                        rating={4}
                        image="https://m.media-amazon.com/images/I/61E8RWSXtoS._AC_SL1500_.jpg"
                    />
                    <Product
                        title="Anker Soundcore Life Q20 Hybrid Active Noise Cancelling Headphones, Wireless Over Ear Bluetooth Headphones, 40H Playtime, Hi-Res Audio, Deep Bass, Memory Foam Ear Cups, for Travel, Home Office"
                        price={59.99}
                        rating={4}
                        image="https://m.media-amazon.com/images/I/91v27T9VVxL._AC_SL1500_.jpg"
                    />
                    <Product
                        title="Goplus Electric Bass Guitar Full Size 4 String with Strap Guitar Bag Amp Cord (Black Bass 4 Straps)"
                        price={119.99}
                        rating={4}
                        image="https://m.media-amazon.com/images/I/61D0VYNw1cL._AC_SL1200_.jpg"
                    />
                </div>

                <div className="Home-row">
                    <Product
                        title="SAMSUNG 65-Inch Class QLED Q80A Series - 4K UHD Direct Full Array Quantum HDR 12x Smart TV with Alexa Built-in (QN65Q80AAFXZA, 2021 Model)"
                        price={1397.99}
                        rating={5}
                        image="https://m.media-amazon.com/images/I/71ihMv1q-kL._AC_SL1500_.jpg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;

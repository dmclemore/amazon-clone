import "./Profile.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "./helpers/StateProvider";
import { db } from "./helpers/firebase";

const Profile = () => {
    const history = useHistory();
    const [{ user }, dispatch] = useStateValue();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    useEffect(() => {
        if (user) {
            const userData = db.collection("users").doc(user?.uid);
            userData.get().then(doc => {
                setEmail(user?.email);
                if (doc.data()) {
                    setFirstName(doc.data().firstName);
                    setLastName(doc.data().lastName);
                    setPhoneNumber(doc.data().phoneNumber);
                    setStreetAddress(doc.data().streetAddress);
                    setCity(doc.data().city);
                    setState(doc.data().state);
                    setZipCode(doc.data().zipCode);
                }
            });
        }
    }, [user]);

    const saveProfile = event => {
        event.preventDefault();
        db.collection("users").doc(user?.uid).set({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            streetAddress: streetAddress,
            city: city,
            state: state,
            zipCode: zipCode,
        });
        history.push("/");
    };

    return (
        <div className="Profile">
            <h1>Your Prime Info</h1>
            <div className="Profile-info">
                <form>
                    <h2>Email</h2>
                    <input
                        type="text"
                        className="Profile-input"
                        value={email}
                        disabled
                    />
                    <h2>First Name</h2>
                    <input
                        type="text"
                        className="Profile-input"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <h2>Last Name</h2>
                    <input
                        type="text"
                        className="Profile-input"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <h2>Phone Number</h2>
                    <input
                        type="text"
                        className="Profile-input"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                    <h2>Street Address</h2>
                    <input
                        type="text"
                        className="Profile-input"
                        value={streetAddress}
                        onChange={e => setStreetAddress(e.target.value)}
                    />
                    <h2>City</h2>
                    <input
                        type="text"
                        className="Profile-input"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                    <h2>State</h2>
                    <input
                        type="text"
                        className="Profile-input"
                        value={state}
                        onChange={e => setState(e.target.value)}
                    />
                    <h2>Zip Code</h2>
                    <input
                        type="text"
                        className="Profile-input"
                        value={zipCode}
                        onChange={e => setZipCode(e.target.value)}
                    />
                    <button
                        className="Profile-saveButton"
                        onClick={saveProfile}
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;

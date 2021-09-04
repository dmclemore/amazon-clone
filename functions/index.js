const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51JVfTmFSTiEYf6jzZxWpo4Tcj16Cs9Ce7mPSSe8CXatSl9IA6MP8ePCv2J84MzRsuA3rYFIyg6ZzNprbxJc6Nop700ToUsOnxh"
);
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

exports.api = functions.https.onRequest(app);

//domain/.netlify/functions/create-payment
require("dotenv").config();

//to connect to the stripe api
const stripe = require("stripe")(process.env.REACT_STRIPE_SECRET_KEY);
exports.handler = async function (e, context) {
  //we want to get the cart and the shipping fee from the post request not a get request to avoid getting the cart from the browser cache
  if (e.httpMethod === "POST") {
    const { cart, shipping_fee, total_amount } = JSON.parse(e.body);

    // get the total amount of the cart
    const calculateOrderAmount = () => {
      //calculate the total amount of the cart and add the shipping fee
      return shipping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "eur",
      });
      return {
        //return the payment intent
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  } else {
    return {
      statusCode: 200,
      body: "access denied, please create a payment",
    };
  }
};

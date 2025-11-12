import Dodopayments from "dodopayments";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const client = new Dodopayments({
  bearerToken: process.env.DODOPAYMENTS_API_KEY,
  environment: process.env.DODOPAYMENTS_ENVIRONMENT || "test_mode",
});

const app = express();

app.post("/checkout", async (req, res) => {
  console.log("Creating checkout session...");

  const session = await client.checkoutSessions.create({
    product_cart: [
      {
        product_id: "your-product-id",
        quantity: 1,
      },
    ],
    customer: {
      email: "customer@example.com",
      name: "John Doe",
    },
    return_url: process.env.DODOPAYMENTS_RETURN_URL,
  });

  console.log("Checkout session created:", session);

  res.json({
    session_id: session.session_id,
    checkout_url: session.checkout_url,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

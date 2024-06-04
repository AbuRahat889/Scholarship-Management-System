import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_PRIVATE_KEY);

const PaymentForm = ({ loader }) => {
  // add stripe key


  return (
    <div className="container mx-auto">
      <Elements stripe={stripePromise}>
        <CheckoutForm loader={loader}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default PaymentForm;

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
import Tes from "./Tes";
const stripePromise = loadStripe(import.meta.env.VITE_PRIVATE_KEY);

const PaymentForm = ({totalPrice}) => {
  // add stripe key

  return (
    <div className="container mx-auto">
      <Elements stripe={stripePromise}>
        <Tes totalPrice={totalPrice}></Tes>
      </Elements>
    </div>
  );
};

export default PaymentForm;

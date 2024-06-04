import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "./../../Hooks/useAxiosSequre";
import { AuthContext } from "../../Contex/AuthProvaider";
import Swal from "sweetalert2";

const Tes = ({ totalPrice, Scholarship_Name }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");

  //   const totalPrice = Tuition_fees + Service_charge + Application_fees;

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setError(error.message);
    } else {
      console.log("PaymentMethod", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          name: user.displayName,
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert. use moment js to
          scholarshipName: Scholarship_Name,
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for the taka paisa",
            showConfirmButton: false,
            timer: 1500,
          });
          // navigate('/dashboard/paymentHistory')
        }
      }
    }
  };

  return (
    <div>
      <h1>total fee :{totalPrice} </h1>
      <form onSubmit={handleSubmit} className=" bg-base-300 p-10">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <p className="text-red-600">{error}</p>
        <div className="flex mt-2 justify-around">
          <button
            className="btn btn-sm btn-primary my-4"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tes;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "./../../Hooks/useAxiosSequre";
import { AuthContext } from "../../Contex/AuthProvaider";
import Swal from "sweetalert2";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ loader }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const totalPrice =
    loader.Application_fees + loader.Tuition_fees + loader.Service_charge;

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
          scholarshipName: loader.Scholarship_Name,
          University_Name: loader.University_Name,
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
          navigate("/applyscholarship");
        }
      }
    }
  };

  return (
    <div>
      <div className="justify-between">
        <h1 className="flex items-center gap-1">
          <GoDotFill />
          Scholarship Name : {loader.Scholarship_Name}
        </h1>
        <h1 className="flex items-center gap-1">
          <GoDotFill /> University : {loader.University_Name}
        </h1>
        <h1 className="flex items-center gap-1">
          <GoDotFill /> total fee : ${totalPrice}{" "}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-3 bg-base-300 rounded-xl px-10 py-5"
      >
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
                padding: "5px",
              },
            },
          }}
        />
        <p className="text-red-600">{error}</p>
        <div className="flex mt-2 justify-start">
          <button
            // onClick={navigate("/applyscholarship")}
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

export default CheckoutForm;

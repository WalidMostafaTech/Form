import { useState } from "react";
import PaymentList from "./sections/PaymentList";
import PaymentCard from "./sections/PaymentCard";
import { Navigate, useLocation } from "react-router";

const Payment = () => {
  const [currentPayment, setCurrentPayment] = useState(null);

  const handlePaymentClick = (payment) => {
    if (currentPayment?.id === payment?.id) setCurrentPayment(null);
    else setCurrentPayment(payment);
  };

  const { state } = useLocation();

  if (!state?.product_id) {
    return <Navigate to="/" />;
  }

  return (
    <section className="container py-6 flex flex-col md:flex-row justify-center gap-8 lg:gap-16">
      <PaymentList
        onPaymentClick={handlePaymentClick}
        currentPayment={currentPayment}
      />

      <PaymentCard
        currentPayment={currentPayment}
        cancelPayment={() => setCurrentPayment(null)}
        state={state}
      />
    </section>
  );
};

export default Payment;

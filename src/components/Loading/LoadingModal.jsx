import Loader from "./Loader";
import { createPortal } from "react-dom";

const LoadingModal = () => {
  return createPortal(
    <section className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Loader />
    </section>,
    document.body
  );
};

export default LoadingModal;

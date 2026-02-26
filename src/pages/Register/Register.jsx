import AuthContainer from "@/components/form/AuthContainer";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { Link } from "react-router";

const Register = () => {
  return (
    <AuthContainer
      title="Choose Your Path"
      description="Please enter your details to access your account"
      coffeeIcon
    >
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/register/customer"
          className="flex flex-col items-center gap-2 border border-border p-4 rounded-lg hover:bg-primary/10 transition"
        >
          <div
            className="text-2xl text-primary bg-primary-foreground w-16 h-16 
            flex items-center justify-center rounded-lg mx-auto"
          >
            <FaRegUser />
          </div>
          <p>Customer</p>
        </Link>

        <Link
          to="/register/company"
          className="flex flex-col items-center gap-2 border border-border p-4 rounded-lg hover:bg-primary/10 transition"
        >
          <div
            className="text-2xl text-primary bg-primary-foreground w-16 h-16 
            flex items-center justify-center rounded-lg mx-auto"
          >
            <HiOutlineBuildingOffice2 />
          </div>
          <p>Company</p>
        </Link>
      </div>

      <hr className="border-border" />

      <div className="text-center text-xs text-muted-foreground">
        Already have an account?
        <Link to="/login" className="text-primary hover:underline ms-1">
          sign in here
        </Link>
      </div>
    </AuthContainer>
  );
};

export default Register;

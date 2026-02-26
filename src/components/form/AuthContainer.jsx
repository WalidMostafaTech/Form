import bgImage from "@/assets/images/auth-bg.png";
import logo from "@/assets/images/logo.png";
import { GiCoffeeBeans } from "react-icons/gi";

const AuthContainer = ({
  children,
  title,
  description,
  coffeeIcon = false,
}) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-dvh">
      <article
        style={{ backgroundImage: `url(${bgImage})` }}
        className="bg-cover bg-center p-4 hidden md:flex flex-col justify-between items-center"
      ></article>

      <section className="flex flex-col justify-center items-center p-8 pt-16 overflow-auto">
        <hgroup className="text-center space-y-2 mb-6 w-full max-w-sm">
          {coffeeIcon && (
            <div className="text-4xl text-primary bg-primary-foreground w-16 h-16 
            flex items-center justify-center rounded-full mx-auto">
              <GiCoffeeBeans />
            </div>
          )}
          <h3 className="text-2xl font-bold text-primary">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </hgroup>

        <div className="w-full max-w-sm flex flex-col gap-4">{children}</div>
      </section>
    </main>
  );
};

export default AuthContainer;

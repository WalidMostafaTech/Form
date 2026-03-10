import logo from "@/assets/images/logo.png";
import { GiCoffeeBeans } from "react-icons/gi";
import { useSelector } from "react-redux";

const AuthContainer = ({
  children,
  title,
  description,
  coffeeIcon = false,
}) => {
  const { settings } = useSelector((state) => state.settings);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2">
      <article
        style={{
          backgroundImage: `url(${settings?.registration_form?.image})`,
        }}
        className="hidden md:flex sticky top-0 h-[calc(100vh-30px)] bg-cover bg-center bg-primary"
      >
        <div className="absolute inset-0 bg-primary/40" />

        <div className="h-full flex flex-col justify-between gap-2 p-4 pt-16 relative z-10">
          <div className="flex-1 flex items-center justify-center">
            <img
              loading="lazy"
              src={settings?.header_logo || logo}
              alt="Logo"
              className="w-[60%] object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-white">
            {settings?.registration_form?.title}
          </h1>
          <p className="text-sm text-white/80">
            {settings?.registration_form?.description}
          </p>
          <p className="text-sm text-primary-foreground pt-2 border-t">
            {settings?.registration_form?.second_description}
          </p>
        </div>
      </article>

      <section className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm pt-16">
          <hgroup className="text-center space-y-2 mb-6">
            {coffeeIcon && (
              <div className="text-4xl text-primary bg-primary-foreground w-16 h-16 
              flex items-center justify-center rounded-full mx-auto">
                <GiCoffeeBeans />
              </div>
            )}

            <h3 className="text-2xl font-bold text-primary">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </hgroup>

          <div className="flex flex-col gap-4">{children}</div>
        </div>
      </section>
    </main>
  );
};

export default AuthContainer;

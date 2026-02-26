import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

const PhoneInputField = ({
  name,
  label,
  placeholder,
  disabled = false,
  value,
  onChange,
  icon = null,
  error,
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <PhoneInput
        id={name}
        international
        defaultCountry="EG"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "phone-input-wrapper",
          icon && "ps-2",
          error && "aria-invalid",
        )}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default PhoneInputField;

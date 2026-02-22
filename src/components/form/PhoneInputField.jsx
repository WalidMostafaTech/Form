import { useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const PhoneInputField = ({ control, name, label }) => {
  useEffect(() => {
    // إضافة استايلات مخصصة للـ phone input
    const styleId = "phone-input-custom-styles";

    // تحقق إذا كان الـ style موجود مسبقاً
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .phone-input-custom .PhoneInputCountrySelect {
        background-color: transparent !important;
        border: none !important;
        cursor: pointer !important;
        margin-left: 0.25rem !important;
      }
      
      .phone-input-custom .PhoneInputCountrySelect:focus {
        outline: none !important;
      }
      
      .phone-input-custom .PhoneInputInput {
        background-color: transparent !important;
        border: none !important;
        outline: none !important;
        flex: 1 !important;
        font-size: 0.875rem !important;
      }
      
      .phone-input-custom .PhoneInputCountryIcon {
        width: 1.5rem !important;
        height: 1rem !important;
        margin-left: 0.5rem !important;
      }
      
      /* للـ light mode */
      .phone-input-custom .PhoneInputCountrySelect option {
        background-color: var(--background) !important;
        color: var(--foreground) !important;
      }
      
      .phone-input-custom .PhoneInputCountrySelect {
        color: var(--foreground) !important;
      }
      
      .phone-input-custom .PhoneInputInput {
        color: var(--foreground) !important;
      }
      
      /* hover للـ options */
      .phone-input-custom .PhoneInputCountrySelect option:hover {
        background-color: var(--accent) !important;
      }
      
      .dark .phone-input-custom .PhoneInputCountrySelect option:hover {
        background-color: var(--accent) !important;
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

            <FormControl>
              <PhoneInput
                {...field}
                international
                defaultCountry="EG"
                className="phone-input-custom bg-muted rounded-full px-4 py-2 border-0 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              />
            </FormControl>

            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PhoneInputField;

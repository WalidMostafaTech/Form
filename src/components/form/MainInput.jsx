import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const MainInput = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
  value,
  onChange,
  options = [],
  icon = null,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      {/* TEXTAREA */}
      {type === "textarea" && (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className="resize-none bg-muted min-h-20"
        />
      )}

      {/* SELECT */}
      {type === "select" && (
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger className={"w-full bg-muted"}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* FILE */}
      {type === "file" && (
        <Input
          id={name}
          type="file"
          disabled={disabled}
          onChange={(e) => onChange(e.target.files?.[0])}
        />
      )}

      {/* NORMAL INPUT */}
      {type !== "textarea" && type !== "select" && type !== "file" && (
        <div className="relative">
          {icon && (
            <span className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              {icon}
            </span>
          )}

          <Input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            disabled={disabled}
            className={`bg-muted
                ${icon ? "ps-10" : ""}
                ${isPassword ? "pe-10" : ""}`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              disabled={disabled}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default MainInput;

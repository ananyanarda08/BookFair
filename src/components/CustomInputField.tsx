import { Field, ErrorMessage } from "formik";

interface CustomInputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  className?: string;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  name,
  type,
  placeholder = "",
  className = "",
}) => {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      <Field
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full border p-2 rounded ${className}`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default CustomInputField;

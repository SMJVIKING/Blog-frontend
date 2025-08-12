import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

function FileInput({
  label,
  name,
  dir = "rtl",
  value,
  isRequired,
  onChange,
  className,
  validationSchema = {},
  errors,
  ...rest
}) 

{
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <label
        htmlFor="file-upload"
        className={`cursor-pointer border-2 border-primary-900 rounded-lg px-3 py-2
         text-primary-900 items-center justify-center flex gap-x-1 ${className}`}
      >
        {label}
        <ArrowUpTrayIcon className="w-5 h-5" />
        <input
          id="file-upload"
          type="file"
          className="sr-only"
          name={name}
          dir={dir}
          onChange={onChange}
          {...rest}
        />
      </label>
  
      {errors && errors[name] && (
        <span className="text-red-600 text-xs mt-2 block">
          {errors[name]?.message}
        </span>
      )}
    </>
  );  
}

export default FileInput;

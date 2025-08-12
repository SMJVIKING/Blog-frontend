import { useFormStatus } from "react-dom";
import Button from "./Button";
import SVGLoaderComponent from "./SVGLoaderComponent";

function SubmitButton({ children, className, ...rest }) {
  const { pending } = useFormStatus();

  return (
    <Button
    disabled={pending}
    {...rest}
      className={`flex items-center justify-center gap-x-4 py-4 ${className}`}
     
    >
      {children}
      {/* loading in actions: */}
      {pending && <SVGLoaderComponent/>}
    </Button>
  );
}

export default SubmitButton;


// useFormStatus() => 
  // این ی هوکه ک از ریکت دام ایمپورت میشه و با کمکش میتونیم ی لودینگ رو ب "باتن اکشن" اضافه کنیم.
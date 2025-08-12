import Button from "./Button";
import SpinnerMini from "./SpinnerMini";

function CommentStatus({ name, options, onConfirm, loading }) {
  return (
    <form className="form" onSubmit={onConfirm}>
      <select id={name} className="textField__input">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {loading ? (
        <SpinnerMini />
      ) : (
        <Button className="w-full" type="submit" variant="primary">
          تایید
        </Button>
      )}
    </form>
  );
}
export default CommentStatus;

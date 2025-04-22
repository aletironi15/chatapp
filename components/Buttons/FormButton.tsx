export default function FormButton(props: {
  loading: boolean;
  btnType: "Forgot Password" | "Sign In" | "Sign Up" | "Loading...";
}) {
  return (
    <button
      type="submit"
      className={`p-2 rounded-sm mt-3 cursor-pointer ${
        props.loading ? "bg-gray-400" : "bg-primary"
      }`}
    >
      {props.btnType}
    </button>
  );
}

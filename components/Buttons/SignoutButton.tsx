export default function FormButton(props: {
  loading: boolean;
  btnType: "Sign Out" | "Loading...";
}) {
  return (
    <button
      type="submit"
      className={`p-2 rounded-sm cursor-pointer ${
        props.loading ? "bg-gray-400" : "bg-red-600"
      }`}
    >
      {props.btnType}
    </button>
  );
}

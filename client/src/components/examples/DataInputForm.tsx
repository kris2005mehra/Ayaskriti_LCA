import DataInputForm from "../DataInputForm";

export default function DataInputFormExample() {
  return (
    <DataInputForm
      onSubmit={(data) => {
        console.log("Form submitted:", data);
      }}
      onBack={() => {
        console.log("Back clicked");
      }}
    />
  );
}

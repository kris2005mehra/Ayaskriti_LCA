import Header from "../Header";

export default function HeaderExample() {
  return (
    <Header
      user={{ username: "Rajesh Kumar", email: "rajesh@hindalco.com" }}
      onLogout={() => console.log("Logout clicked")}
    />
  );
}

import AuthPage from "../AuthPage";

export default function AuthPageExample() {
  return (
    <AuthPage
      onAuthenticate={(user) => {
        console.log("User authenticated:", user);
      }}
    />
  );
}

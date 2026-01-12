import Navbar from "./navbar/Navbar";
import { AuthProvider } from "../context/AuthContext";
// import ProtectedRoute from "../components/ProtectedRoute";
import { FormProvider } from "../context/FormContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FormProvider>
        <Navbar />
        {/* <ProtectedRoute> */}
        <AuthProvider>{children}</AuthProvider>
        {/* </ProtectedRoute> */}
      </FormProvider>
    </>
  );
}

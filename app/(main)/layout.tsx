
import Navbar from "./navbar/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import { FormProvider } from "../context/FormContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <FormProvider>
        <Navbar />
        {children}
      </FormProvider>
    </ProtectedRoute>
  );
}

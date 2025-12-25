
import Navbar from "../components/navbar/Navbar";
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
        {children}
      </FormProvider>
    </>
  );
}


import Footer from "../components/footer/Footer";
import PublicNavbar from "../components/public-navbar/PublicNavbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
          {children}
          <Footer/>
    </>
  );
}

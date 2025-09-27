import Header from "@/components/layout/Header";
import Dashboard from "@/components/dashboard/Dashboard";
import Footer from "@/components/footer/Footer";
import LandingPage from "@/components/landing/LandingPage";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <LandingPage />
      <main className="container mx-auto py-8">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import Header from "@/components/layout/Header";
import Dashboard from "@/components/dashboard/Dashboard";
import Footer from "@/components/footer/Footer";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main className="container mx-auto py-8">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;

import Header from "@/components/layout/Header";
import SubjectsList from "@/components/subjects/SubjectsList";

const Subjects = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <Header />
      <main className="container mx-auto py-8">
        <SubjectsList />
      </main>
    </div>
  );
};

export default Subjects;
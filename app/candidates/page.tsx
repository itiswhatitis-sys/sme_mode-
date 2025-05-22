import CandidatesTable from "@/components/CandidatesTable";

export default function Candidates() {
  return (
    
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">
            Pick the top-performing student from our Eco-System
          </p>
        </div>
        
        <CandidatesTable />
      </div>
   
  );
}
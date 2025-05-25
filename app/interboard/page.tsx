import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export default function Interboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interboard</h1>
        <p className="text-muted-foreground">
          Pick the top-performing student from our Eco-System
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <Input placeholder="Search jobs..." className="flex-1" />

        <select className="lg:w-1/5 border rounded-md px-3 py-2 bg-background text-foreground">
          <option value="">Type</option>
          <option value="full-time">Full-Time</option>
          <option value="freelance">Freelance</option>
          <option value="internship">Internship</option>
        </select>

        <Input placeholder="Your Location" className="lg:w-1/5" />
      </div>
      <p className="text-sm text-muted-foreground">
        Suggestion: Programming, Designer, Digital Marketing, Animation, Editor
      </p>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            company: "Interain",
            role: "Software Developer Intern",
            date: "2025-04-17",
            salary: "₹ 10 - 15 LPA",
            location: "Chennai",
            tag: "FULL-TIME",
            logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
          },
          {
            company: "Interain AI",
            role: "SWDD",
            date: "2027-01-27",
            salary: "₹ 25000",
            location: "Chennai",
            tag: "FREELANCE",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Signature_icon.svg/1024px-Signature_icon.svg.png",
          },
          {
            company: "FutureTech",
            role: "AI Research Intern",
            date: "2026-09-15",
            salary: "₹ 30,000",
            location: "Remote",
            tag: "INTERNSHIP",
            logo: "https://cdn-icons-png.flaticon.com/512/5969/5969020.png",
          },
        ].map((job, idx) => (
          <div
            key={idx}
            className="border rounded-xl p-4 flex flex-col gap-3 shadow-sm bg-card text-card-foreground transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                <img src={job.logo} alt="Logo" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{job.company}</p>
                <h3 className="font-semibold">{job.role}</h3>
              </div>
              <span className="ml-auto text-xs font-medium bg-muted px-2 py-0.5 rounded">
                {job.tag}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-4">
              <Calendar className="w-4 h-4" /> {job.date}
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-4">
              {job.salary} <MapPin className="w-4 h-4 ml-2" /> {job.location}
            </div>
            <Link href="/interboard/viewdetails">
            <Button className="self-start mt-2 bg-blue-600">View Details</Button>
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

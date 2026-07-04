import { leadsData } from "../data/leads";

function Dashboard() {
  const totalLeads = leadsData.length;
  const newLeads = leadsData.filter((lead) => lead.status === "New").length;
  const contactedLeads = leadsData.filter((lead) => lead.status === "Contacted").length;
  const convertedLeads = leadsData.filter((lead) => lead.status === "Converted").length;

  return (
    <div>
      <h1>LeadFlow CRM Dashboard</h1>

      <div>
        <p>Total Leads: {totalLeads}</p>
        <p>New Leads: {newLeads}</p>
        <p>Contacted: {contactedLeads}</p>
        <p>Converted: {convertedLeads}</p>
      </div>
    </div>
  );
}

export default Dashboard;
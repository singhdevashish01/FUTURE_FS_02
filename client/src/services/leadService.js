import { leadsData } from "../data/leads";

export const getAllLeads = () => {
  return leadsData;
};

export const getLeadStatistics = () => {
  const total = leadsData.length;
  const newLeads = leadsData.filter((lead) => lead.status === "New").length;
  const contacted = leadsData.filter((lead) => lead.status === "Contacted").length;
  const converted = leadsData.filter((lead) => lead.status === "Converted").length;

  return {
    total,
    newLeads,
    contacted,
    converted,
  };
};

export const getRecentLeads = (limit = 3) => {
  return leadsData.slice(0, limit);
};

export const getLeadSources = () => {
  return leadsData.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {});
};
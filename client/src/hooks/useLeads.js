import { useEffect, useState } from "react";
import { leadsData } from "../data/leads";
import {
  fetchLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../services/leadApi";

function useLeads() {
  const [leads, setLeads] = useState(leadsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetchLeads();
      setLeads(response.data);
    } catch (err) {
      console.error(err);
      setError("Using demo data until backend database is connected.");
      setLeads(leadsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  return {
    leads,
    setLeads,
    loading,
    error,
    loadLeads,
    createLead,
    updateLead,
    deleteLead,
  };
}

export default useLeads;
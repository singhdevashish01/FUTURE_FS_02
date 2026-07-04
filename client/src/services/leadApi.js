import API from "./api";

export const fetchLeads = () => API.get("/leads");

export const createLead = (leadData) => API.post("/leads", leadData);

export const updateLead = (id, leadData) => API.put(`/leads/${id}`, leadData);

export const deleteLead = (id) => API.delete(`/leads/${id}`);
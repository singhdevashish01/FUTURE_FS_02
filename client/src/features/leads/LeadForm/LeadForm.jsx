import {
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  LEAD_STATUSES,
} from "../../../constants/leadConstants";

function LeadForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  title,
  submitText,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-6">{title}</h2>

        <form onSubmit={onSubmit} className="space-y-8">
          <section>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2" />
              <input name="email" type="email" placeholder="Email *" value={formData.email} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2" />
              <input name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2" />
              <input name="company" placeholder="Company *" value={formData.company} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2" />
              <input name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
              <input name="website" placeholder="Website" value={formData.website} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
              <input name="industry" placeholder="Industry" value={formData.industry} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
              <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Sales Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="source" value={formData.source} onChange={handleChange} className="w-full border rounded-lg px-4 py-2">
                {LEAD_SOURCES.map((source) => (
                  <option key={source}>{source}</option>
                ))}
              </select>

              <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded-lg px-4 py-2">
                {LEAD_STATUSES.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>

              <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border rounded-lg px-4 py-2">
                {LEAD_PRIORITIES.map((priority) => (
                  <option key={priority}>{priority}</option>
                ))}
              </select>

              <input name="estimatedValue" type="number" min="0" placeholder="Estimated Deal Value" value={formData.estimatedValue} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
              <input name="probability" type="number" min="0" max="100" placeholder="Probability (%)" value={formData.probability} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
              <input name="assignedTo" placeholder="Assigned To" value={formData.assignedTo} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Follow-up Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="nextFollowUp" type="date" value={formData.nextFollowUp} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
              <input name="expectedCloseDate" type="date" value={formData.expectedCloseDate} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
              <input name="lastContacted" type="date" value={formData.lastContacted} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Notes & Requirements</h3>

            <div className="grid grid-cols-1 gap-4">
              <textarea name="requirements" placeholder="Requirements" value={formData.requirements} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
              <textarea name="painPoints" placeholder="Pain Points" value={formData.painPoints} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
              <textarea name="notes" placeholder="Notes / Follow-up" value={formData.notes} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
              <input name="tags" placeholder="Tags comma separated e.g. enterprise, urgent" value={formData.tags} onChange={handleChange} className="w-full border rounded-lg px-4 py-2" />
            </div>
          </section>

          <div className="flex justify-end gap-3 sticky bottom-0 bg-white pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadForm;
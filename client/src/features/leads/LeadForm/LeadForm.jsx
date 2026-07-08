import {
  LEAD_PRIORITIES,
  LEAD_SOURCES,
  LEAD_STATUSES,
} from "../../../constants/leadConstants";

import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

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
              <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
              <Input label="Company" name="company" value={formData.company} onChange={handleChange} required />
              <Input label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
              <Input label="Website" name="website" value={formData.website} onChange={handleChange} />
              <Input label="Industry" name="industry" value={formData.industry} onChange={handleChange} />
              <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Sales Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Source" name="source" value={formData.source} onChange={handleChange} options={LEAD_SOURCES} />
              <Select label="Status" name="status" value={formData.status} onChange={handleChange} options={LEAD_STATUSES} />
              <Select label="Priority" name="priority" value={formData.priority} onChange={handleChange} options={LEAD_PRIORITIES} />

              <Input label="Estimated Deal Value" name="estimatedValue" type="number" value={formData.estimatedValue} onChange={handleChange} />
              <Input label="Probability (%)" name="probability" type="number" value={formData.probability} onChange={handleChange} />
              <Input label="Assigned To" name="assignedTo" value={formData.assignedTo} onChange={handleChange} />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Follow-up Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Next Follow-up" name="nextFollowUp" type="date" value={formData.nextFollowUp} onChange={handleChange} />
              <Input label="Expected Close Date" name="expectedCloseDate" type="date" value={formData.expectedCloseDate} onChange={handleChange} />
              <Input label="Last Contacted" name="lastContacted" type="date" value={formData.lastContacted} onChange={handleChange} />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Notes & Requirements</h3>

            <div className="grid grid-cols-1 gap-4">
              <textarea name="requirements" placeholder="Requirements" value={formData.requirements} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              <textarea name="painPoints" placeholder="Pain Points" value={formData.painPoints} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              <Input label="Tags" name="tags" value={formData.tags} onChange={handleChange} placeholder="enterprise, urgent, referral" />
            </div>
          </section>

          <div className="flex justify-end gap-3 sticky bottom-0 bg-white pt-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>

            <Button type="submit" variant="primary">
              {submitText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadForm;
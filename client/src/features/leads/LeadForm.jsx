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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
          </select>

          <textarea
            name="notes"
            placeholder="Notes / Follow-up"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadForm;
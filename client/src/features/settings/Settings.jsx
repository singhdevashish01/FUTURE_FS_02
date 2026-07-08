import Layout from "../../components/layout/Layout";

function Settings() {
  return (
    <Layout title="Settings">
      <p className="text-gray-600 mb-6">
        Manage admin profile and CRM preferences.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4">Admin Profile</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Name</label>
              <input
                type="text"
                value="Admin User"
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                value="admin@leadflowcrm.com"
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4">CRM Preferences</h3>

          <div className="space-y-3 text-gray-700">
            <p>Lead status workflow: New → Contacted → Qualified → Proposal Sent → Negotiation → Won</p>
            <p>Default lead source: Website Contact Form</p>
            <p>Notification mode: In-app</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
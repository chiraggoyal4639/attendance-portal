// src/components/RegistrationRequests.jsx

const RegistrationRequests = ({ requests, approveRequest }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Registration Requests</h2>
      </div>
      <div className="p-6">
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.slice(0, 3).map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{r.name}</h3>
                  <p className="text-sm text-gray-600">@{r.username}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(r.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => approveRequest(i)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
                  >
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-md transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">📨</div>
            <p className="text-gray-500">No pending requests</p>
          </div>
        )}
        {requests.length > 3 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              View all requests →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationRequests;

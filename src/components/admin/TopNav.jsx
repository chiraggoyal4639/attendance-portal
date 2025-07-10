const TopNav = ({ onLogout }) => {
  return (
    <div className="bg-indigo-800 shadow-md border-b border-indigo-200">
      <div className="px-10 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[45px] font-[600] text-white">Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;

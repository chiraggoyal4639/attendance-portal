const TopNav = ({ onLogout }) => {
  return (
    <div className="bg-indigo-800 shadow-md border-b border-indigo-200">
      <div className="px-10 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[45px] font-[600] text-white flex items-center">
            <img src="/assets/logo.jpg" alt="logo" className="h-14 w-auto pr-5" />
            Admin Dashboard
          </h1>
          <button
            onClick={onLogout}
            className="px-7 pb-4 pt-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors shadow text-[20px]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;

// 📁 components/student/ProgressBar.jsx
const ProgressBar = ({ percentage }) => {
  return (
    <div className="mb-6">
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

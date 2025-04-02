const VoteButtons = ({ onVote, fetchData }) => {
  return (
    <div className="flex space-x-2 mt-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          onClick={async () => {
            await onVote(num); // Vote first
            fetchData(); // Then refresh data
          }}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default VoteButtons;


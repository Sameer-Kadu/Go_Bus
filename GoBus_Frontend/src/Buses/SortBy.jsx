const SortBy = () => {
  return (
    <div className="flex gap-[300px] inline-flex w-[100%]">
      <div className="w-[100px]">
        <span className="font-bold">1 Bus</span> <span>found</span>
      </div>

      <div className="flex justify-between w-[100%]">
        <span className="font-semibold">SORT BY:</span>
        <span>Departure</span>
        <span>Duration</span>
        <span>Arrival</span>
        <span >Ratings</span>
        <span >Fare</span>
        <span>Seats Available</span>
      </div>
    </div>
  );
};
export default SortBy;

const From_Source = () => {
  return (
    <div>
      <label
        htmlFor="From"
        className="block text-sm/6 font-medium text-blue-100"
      >
        From
      </label>
      <div className="mt-2 bg-white rounded-md mb-4 w-80">
        <div className="flex items-center rounded-md outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-white">
          <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
            <img
              src="/img/Source_stop.svg"
              alt=""
              className="w-10 h-10 "
            />
          </div>
          <input
            id="price"
            name="price"
            type="text"
            placeholder="Source"
            className="block min-w-0 pl-1 grow mr-4 rounded-md py-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 focus:ring-2 focus:ring-white border-none sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
};
export default From_Source;

import { useTranslation } from "react-i18next";

const To_destination = ({destination, setDestination}) => {
 const {t} = useTranslation();
  return (
    <div>
      <label htmlFor="To" className="block text-sm/6 font-medium text-blue-100">
      {t('home.form.destination.label')}
      </label>
      <div className="mt-2 bg-white rounded-md mb-4 w-80">
        <div className="flex items-center rounded-md outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-white">
          <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
            <img
              src="/img/Destination_stop.svg"
              alt=""
              className="w-10 h-10 "
            />
          </div>
          <input
            id="destination"
            name="destination"
            type="text"
            value={destination}
            placeholder={t('home.form.destination.placeholder')}
            onChange={(e) => {setDestination(e.target.value)}}
            className="block min-w-0 pl-1 grow rounded-md py-1.5 pr-3 text-gray-900 placeholder:text-gray-400 focus:outline-none border-none focus:ring-2 focus:ring-white sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
};
export default To_destination;

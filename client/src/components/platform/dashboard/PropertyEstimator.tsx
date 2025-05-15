import AlcaldiaDropdown from "@/components/platform/dashboard/dropdowns/AlcaldiaDropdown";
import GroupDropdowns from "@/components/platform/dashboard/dropdowns/GroupDropdowns";
import SizeSlider from "@/components/platform/dashboard/SizeSlider";

const PropertyEstimator = () => {
  return (
    <div className="w-full max-w-md p-4 shadow-xl rounded-xl">
      <div className="space-y-4">
        <div className=" text-center justify-center">
          <h3 className="font-medium">Property Value Estimator</h3>
          <p className="text-sm text-muted-foreground">
            Enter property details to get an estimated market value
          </p>
        </div>
        <AlcaldiaDropdown />

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label htmlFor="street" className="block mb-1">
              Dirección
            </label>
            <input
              id="street"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="zip" className="block mb-1">
              Código Postal
            </label>
            <input
              id="zip"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <GroupDropdowns />

        <div>
          <SizeSlider />
        </div>
      </div>
    </div>
  );
};

export default PropertyEstimator;

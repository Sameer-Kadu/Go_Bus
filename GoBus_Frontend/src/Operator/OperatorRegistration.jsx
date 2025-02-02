import { useState } from 'react';

const OperatorRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    AgencyName: "",
    zipCode: "",
    state: "",
    city: "",
    phoneNumber: "",
    OwnerName: "",
    country: "",
    District: "",

    // Bank Details
    BankName: "",
    AccountNumber: "",
    IFSCCode: "",
    AccountType: "",
    BenificharyName: "",
    PAN: "",

    // Gst Details
    GST: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    let isValid = true;
  
    if (step === 1) {
      const { AgencyName, OwnerName, country, state, District, city, zipCode, phoneNumber } = formData;
      if (!AgencyName || !OwnerName || !country || !state || !District || !city || !zipCode || !phoneNumber) {
        isValid = false;
      }
    } else if (step === 2) {
      const { BankName, AccountNumber, IFSCCode, AccountType, BenificharyName, PAN } = formData;
      if (!BankName || !AccountNumber || !IFSCCode || !AccountType || !BenificharyName || !PAN) {
        isValid = false;
      }
    } else if (step === 3) {
      const { GST } = formData;
      if (!GST) {
        isValid = false;
      }
    }
  
    if (isValid) {
      setStep(prev => Math.min(prev + 1, 3));
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  };

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex ">
      {/* Left sidebar with progress indicator */}
      <div className="w-80 bg-black text-white p-8 flex items-center justify-center min-h-screen">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-gray-600" />
          
          {/* Steps */}
          <div className="space-y-16">
            <div className="relative flex items-center">
              <div className={`w-4 h-4 rounded-full ${step >= 1 ? 'bg-white' : 'bg-gray-600'} relative z-10`} />
              <div className="ml-6">
                <div className="text-sm text-gray-400">Step 1</div>
                <div className="font-medium">Personal Information</div>
              </div>
            </div>
            
            <div className="relative flex items-center">
              <div className={`w-4 h-4 rounded-full ${step >= 2 ? 'bg-white' : 'bg-gray-600'} relative z-10`} />
              <div className="ml-6">
                <div className="text-sm text-gray-400">Step 2</div>
                <div className="font-medium">Bank Details</div>
              </div>
            </div>
            
            <div className="relative flex items-center">
              <div className={`w-4 h-4 rounded-full ${step >= 3 ? 'bg-white' : 'bg-gray-600'} relative z-10`} />
              <div className="ml-6">
                <div className="text-sm text-gray-400">Step 3</div>
                <div className="font-medium">GST Details</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 bg-white flex items-center justify-center min-h-screen">
      <div className="absolute  top-4 right-4  w-20">
          <img src="./img/GoBuslogo.png" alt="" />
          
        </div>
        <div className="absolute top-20 left-80">
        <hr className="w-screen border-t border-gray-400"/>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium">
              {step === 1 && 'Personal Information'}
              {step === 2 && 'Bank Details'}
              {step === 3 && 'GST Details'}
            </h2>
            
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {step === 1 && (
                <>
                  <input
                    type="text"
                    placeholder="Agency Name *"
                    name="AgencyName"
                    value={formData.AgencyName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Owner Name *"
                    name="OwnerName"
                    value={formData.OwnerName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  >
                    <option value="">Select Country *</option>
                    <option value="IN">India</option>
                  </select>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="State *"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                    <input
                      type="text"
                      placeholder="District *"
                      name="District"
                      value={formData.District}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City *"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code *"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <input
                    type="text"
                    placeholder="Bank Name *"
                    name="BankName"
                    value={formData.BankName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Account Number *"
                    name="AccountNumber"
                    value={formData.AccountNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="IFSC Code *"
                    name="IFSCCode"
                    value={formData.IFSCCode}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <select
                    name="AccountType"
                    value={formData.AccountType}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  >
                    <option value="">Select Account Type *</option>
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Beneficiary Name *"
                    name="BenificharyName"
                    value={formData.BenificharyName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="PAN Number *"
                    name="PAN"
                    value={formData.PAN}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <input
                    type="text"
                    placeholder="GST Number *"
                    name="GST"
                    value={formData.GST}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                </>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OperatorRegistration;
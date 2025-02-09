import { useState } from 'react';
import { registerOperator } from '../services/operator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OperatorRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    agencyName: "", // Agency name
    zipCode: "", // Zip code
    state: "", // State
    city: "", // City
    phoneNumber: "", // Phone number
    ownerName: "", // Owner name
    country: "", // Country
    district: "", // District
    bankName: "", // Bank name
    accountNumber: "", // Account number
    ifscCode: "", // IFSC code
    accountType: "", // Account type ('Saving' or 'Current')
    beneficiaryName: "", // Beneficiary name
    pan: "", // PAN
    gst: "" // GST
  });

  const handleNext = () => {
    let isValid = true;

    if (step === 1) {
      const { agencyName, ownerName, country, state, district, city, zipCode, phoneNumber } = formData;
      if (!agencyName || !ownerName || !country || !state || !district || !city || !zipCode || !phoneNumber) {
        isValid = false;
      }
    } else if (step === 2) {
      const { bankName, accountNumber, ifscCode, accountType, beneficiaryName, pan } = formData;
      if (!bankName || !accountNumber || !ifscCode || !accountType || !beneficiaryName || !pan) {
        isValid = false;
      }
    } else if (step === 3) {
      const { gst } = formData;
      if (!gst) {
        isValid = false;
      }
    }

    if (isValid) {
      setStep(prev => Math.min(prev + 1, 3));
    } else {
      toast.warning("Please fill in all required fields before proceeding.")
      // alert("Please fill in all required fields before proceeding.");
    }
  };

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const [showPopup, setShowPopup] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const result = await registerOperator(formData);
    
    if (result.status === 201) {
      console.log("Register successful");

      // ✅ Show popup
      setShowPopup(true);

      // ✅ After 3 seconds, hide popup and redirect
      setTimeout(() => {
        setShowPopup(false);
        navigate("/auth");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex">
  {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">You have registered successfully!</h2>
            <p>We will review your profile and approve it soon.</p>
          </div>
        </div>
      )}

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
        <div className="absolute top-4 right-4 w-20">
          <img src="./img/GoBuslogo.png" alt="" />
        </div>
        <div className="absolute top-20 left-80">
          <hr className="w-screen border-t border-gray-400" />
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
                    name="agencyName"
                    value={formData.agencyName}
                    onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Owner Name *"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                    <input
                      type="text"
                      placeholder="District *"
                      name="district"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code *"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                      required
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
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
                    name="bankName"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Account Number *"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="IFSC Code *"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
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
                    name="beneficiaryName"
                    value={formData.beneficiaryName}
                    onChange={(e) => setFormData({ ...formData, beneficiaryName: e.target.value })}
                    className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                    required
                  />
                  <input
                    type="text"
                    placeholder="PAN Number *"
                    name="pan"
                    value={formData.pan}
                    onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
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
                    name="gst"
                    value={formData.gst}
                    onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
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

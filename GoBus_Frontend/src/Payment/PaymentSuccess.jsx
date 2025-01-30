import PropTypes from 'prop-types';
import { Check} from 'lucide-react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from '../components/Button';
const PaymentSuccessModal = ({ isOpen }) => {
    if (!isOpen) return null;
  
    const handleHomeClick = () => {
      // Instead of using router, we can use window.location
      window.location.href = '/';
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-sm text-gray-500 mb-6">
              Thank you for your booking. Your ticket has been sent to your email.
            </p>
            <div className="flex gap-4 justify-center">
                <Button
                        id="watch-trailer"
                        title="Return to Home"
                        leftIcon={<TiLocationArrow />}
                        change={handleHomeClick}
                        containerClass="!bg-yellow-300 flex-center gap-1"
                      />
             
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default PaymentSuccessModal;
  PaymentSuccessModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };
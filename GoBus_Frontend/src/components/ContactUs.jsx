import { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { X } from "lucide-react";
const ContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    file: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form and close popup after 2 seconds
    setTimeout(() => {
      setIsOpen(false);
      setIsSuccess(false);
      setFormData({ file: "", email: "", message: "" });
      // In a real application, you might want to redirect here
      // window.location.href = '/';
    }, 2000);
  };

  return (
    <div>
      <Button
        id="Contact_Us"
        title="Contact Us"
        change={() => {
          setIsOpen(true);
        }}
        leftIcon={<TiLocationArrow />}
        containerClass="!bg-yellow-300 flex-center gap-1"
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
         <div className="flex justify-end">
          <button
              onClick={() => {
                setIsOpen(false);
              }}
              className=" text-black hover:text-gray-700"
            >
              <X size={20} />
            </button>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-black">Contact Us</h2>
            
            {isSuccess ? (
              <div className="text-center py-4">
                
                <p className="text-green-600 font-semibold">
                  Query raised successfully!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                    
                  <label htmlFor="file" className="flex text-left text-black">
                    Name
                  </label>
                  <input
                    type="text"
                    id="file"
                    name="file"
                    value={formData.file}
                    onChange={handleInputChange}
                    required
                    className="mt-1 p-2 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="flex text-left text-black">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 p-2 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="flex test-left text-black"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="text-black p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    rows="4"
                  ></textarea>
                </div>
                <Button
                  id="Submit"
                  title={isSubmitting ? "Submitting..." : "Submit"}
                  disabled={isSubmitting}
                  leftIcon={<TiLocationArrow />}
                  containerClass={` ${isSubmitting ? "!bg-yellow-200 flex-center gap-1" : "!bg-yellow-400 flex-center gap-1"}`}
                />
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;

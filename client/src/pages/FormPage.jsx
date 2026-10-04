import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { submitUserData, submitIdea, submitMedia } from "../api/data";
import { User, Mail, Phone, Building2, IdCard, ArrowLeft, Send, Lightbulb, Tag, FileText, MapPin, Briefcase, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import dashboardBg from "../assets/dashboardbg.webp";
import { toast } from "react-toastify";

const InputGroup = ({ icon: Icon, type = "text", name, placeholder, value, onChange, required = false, isTextArea = false }) => (
  <div className="relative group">
    <div className={`absolute left-4 ${isTextArea ? 'top-6' : 'top-1/2 -translate-y-1/2'} text-gray-400 group-focus-within:text-cyan-400 transition-colors`}>
      <Icon className="w-5 h-5" />
    </div>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows="4"
        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 resize-none"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300"
      />
    )}
  </div>
);

const FormPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const formType = location.state?.type || "participant";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  // Configuration for different form types
  const formConfigs = {
    participant: {
      title: "SUBMIT DETAILS",
      subtitle: "Please fill in participant information below",
      apiFunc: submitUserData,
      fields: [
        { name: "name", label: "Full Name", icon: User, required: true },
        { name: "mobile", label: "Mobile Number", icon: Phone, required: true },
        { name: "email", label: "Email Address", icon: Mail, type: "email", required: true },
        { name: "college", label: "College / University Name", icon: Building2, required: true },
        { name: "sf_id_if_registered", label: "SF ID (Optional)", icon: IdCard, required: false },
      ],
      initialState: { name: "", email: "", mobile: "", college: "", sf_id_if_registered: "" }
    },
    idea: {
      title: "SUBMIT IDEA",
      subtitle: "Share your creative ideas for Spring Fest",
      apiFunc: submitIdea,
      fields: [
        { name: "title", label: "Idea Title", icon: Lightbulb, required: true },
        { name: "category", label: "Category", icon: Tag, required: true },
        { name: "idea", label: "Describe your Idea", icon: FileText, required: true, isTextArea: true },
      ],
      initialState: { title: "", category: "", idea: "" }
    },
    contact: {
      title: "SUBMIT CONTACT",
      subtitle: "Provide media or publicity and college admin details",
      apiFunc: submitMedia,
      fields: [
        { name: "name", label: "Contact Name", icon: User, required: true },
        { name: "email", label: "Email Address", icon: Mail, type: "email", required: true },
        { name: "mobile", label: "Mobile Number", icon: Phone, required: true },
        { name: "college", label: "College / Organization", icon: Building2, required: true },
        { name: "city", label: "City", icon: MapPin, required: true },
        { name: "por", label: "Position of Responsibility (POR)", icon: Briefcase, required: true },
        { name: "contact_type", label: "Contact Type (Publicity/Media)", icon: Users, required: true },
      ],
      initialState: { name: "", email: "", mobile: "", college: "", city: "", por: "", contact_type: "" }
    }
  };

  const currentConfig = formConfigs[formType];

  useEffect(() => {
    setFormData(currentConfig.initialState);
  }, [formType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login first!");
      return;
    }

    // Phone number validation
    if (formData.mobile) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.mobile)) {
        toast.error("Please enter a valid 10-digit mobile number.");
        return;
      }
    }

    setLoading(true);
    const toastId = toast.loading("Submitting form...");

    try {
      // Filter out empty strings to avoid validation errors
      const cleanData = Object.fromEntries(
        Object.entries(formData).filter(([_, v]) => v !== "")
      );

      const response = await currentConfig.apiFunc(token, cleanData);
      console.log("Response:", response);

      toast.update(toastId, {
        render: "Submitted successfully! 🎉",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setFormData(currentConfig.initialState);

      setTimeout(() => navigate("/dashboard"), 1500);

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.update(toastId, {
        render: "Submission failed! Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 font-sans">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      >

        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <h2 className="font-jaro text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-2 uppercase">
              {currentConfig.title}
            </h2>
            <p className="text-gray-400">{currentConfig.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentConfig.fields.map((field) => (
                // Render textareas in full width, inputs in grid if possible
                <div key={field.name} className={field.isTextArea || currentConfig.fields.length % 2 !== 0 && field.name === currentConfig.fields[currentConfig.fields.length - 1].name ? "md:col-span-2" : ""}>
                  <InputGroup
                    icon={field.icon}
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.label}
                    required={field.required}
                    isTextArea={field.isTextArea}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  Submit Form
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;

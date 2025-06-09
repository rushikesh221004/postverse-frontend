import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // ✅ Form submit success
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/v1/auth/register", data);
      console.log(response)
      toast.success("Registration Successful!");
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      toast.error(error.response?.data.message)
    }
  };

  // ✅ Form validation errors
  const onError = (errors) => {
    if (errors.fullName) {
      toast.error("Full name is required");
    } else if (errors.email) {
      toast.error("Email is required");
    } else if (errors.password) {
      toast.error("Password is required");
    }
  };

  return (
    <div className="flex w-full justify-center items-center h-screen px-6 py-8 mx-auto lg:py-0">
      <div className="w-full h-fit bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>

          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div>
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Full Name
              </label>
              <input
                {...register("fullName", { required: true })}
                type="text"
                id="fullName"
                placeholder="Rushikesh Manjre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 rounded bg-gray-50"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  I accept the{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isSubmitting ? "Creating..." : "Create an account"}
            </button>

            <p className="text-sm font-light text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-600 hover:underline">
                Login here
              </a>
            </p>
          </form>

          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
};

export default Register;

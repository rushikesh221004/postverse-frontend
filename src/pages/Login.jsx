import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate()
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/v1/auth/login", data);
      console.log(response)
      toast.success("Login Successful!");
      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (error) {
      toast.error(error.response?.data.message)
    }
  };

  const onError = (errors) => {
    if (errors.email) {
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
            Login to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
              {...register("email", {required: true})}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@company.com"
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
              {...register("password", {required: true})}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-500"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full hover:bg-primary-700 bg-[#2563EB] text-white active:scale-90 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isSubmitting ? "Login..." : "Login"}
            </button>
            <p className="text-sm font-light text-gray-500">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Register
              </a>
            </p>
          </form>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
};

export default Login;

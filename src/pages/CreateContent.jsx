import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreateContent = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();

    // ✅ file actual bhej rahe ho yaha
    formData.append("img", data.img[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);

      try {
        const response = await axios.post(
          "/api/v1/content/create-content",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Content uploaded successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (error) {
        const status = error?.response?.data?.statusCode
        if(status === 401) {
          navigate("/login")
        }}
  };

  useEffect(() => {
     const fetchContent = async () => {
      try {
        await axios.get("/api/v1/content/get-all-contents");
      } catch (error) {
        const status = error?.response?.data?.statusCode
        if(status === 401) {
          navigate("/login")
        }
      }
    };
    fetchContent();
  })

  const onError = (errors) => {
    if (errors.img) {
      toast.error("Please upload an image.");
    } else if (errors.title) {
      toast.error("Title is required.");
    } else if (errors.description) {
      toast.error("Description cannot be empty.");
    }
  };

  return (
    <div className="flex w-full justify-center items-center h-screen px-6 py-8 mx-auto lg:py-0">
      <div className="w-full h-fit bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Write your thoughts
          </h1>
          <ToastContainer position="top-right" autoClose={2000} />
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <label
                htmlFor="img"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Image
              </label>
              <input
                {...register("img", { required: true })}
                type="file"
                name="img"
                id="img"
                accept="image/*"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Beautiful Mountain View"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                {...register("description", { required: true })}
                name="description"
                id="description"
                placeholder="Write your thoughts here..."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full hover:bg-primary-700 bg-[#2563EB] text-white active:scale-90 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContent;

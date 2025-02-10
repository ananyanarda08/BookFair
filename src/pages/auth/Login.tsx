import { Formik, Form } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import background1 from "../../assets/images/mainbg1.jpeg";
import CustomInputField from "../../components/CustomInputField";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-5 sm:px-10 bg-[#f7efcf]">
      <div className="absolute inset-0 z-0 " />

      <div className="relative flex flex-col sm:flex-row w-full sm:w-[800px] max-h-[500px] bg-transparent border-2 border-gray-900 shadow-lg rounded-2xl overflow-hidden z-10 text-gray-900">
        
        <div className="w-full sm:w-1/2 flex flex-col justify-center items-center px-5 sm:px-10 bg-transparent backdrop-blur-lg bg-[#B4D6A9] bg-opacity-30 rounded-lg" style={{ backgroundImage: `url(${background1})`, backgroundPosition: "center" }}>
        </div>

        <div className="w-full sm:w-1/2 p-6 sm:p-8 border-t sm:border-l border-[#D1D1D1] flex flex-col justify-center bg-transparent backdrop-blur-lg bg-[#B4D6A9] bg-opacity-20 rounded-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-2 text-[#3A7D44]">BookFair</h2>
          <p className="text-lg sm:text-xl text-center mb-4">
            Sign in to continue exploring a world of books and stories at the Biggest Online Book Fair.
          </p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email address").required("Email is required"),
              password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
            })}
            onSubmit={(values) => {
              const storedUser = localStorage.getItem("user");
              if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.email === values.email && user.password === values.password) {
                  user.type === "seller" ? navigate("/seller-dashboard") : navigate("/buyer-dashboard");
                } else {
                  alert("Invalid credentials");
                }
              }
            }}
          >
            <Form className="space-y-6">
              <CustomInputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter Your Email"
                className="bg-transparent border-2 border-[#0e0303] text-[#333333] placeholder-[#B8B8B8] p-3 rounded-md focus:ring-2 focus:ring-[#5C6B5C] w-full"
              />
              <CustomInputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter Your Password"
                className="bg-transparent border-2 border-[#0e0303] text-[#333333] placeholder-[#B8B8B8] p-3 rounded-md focus:ring-2 focus:ring-[#5C6B5C] w-full"
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#3A7D44] hover:bg-[#4B5B4B] text-white py-3 px-8 rounded-lg font-semibold transition"
                >
                  Login
                </button>
              </div>

              <div className="text-center mt-2">
                Don't have an account?
                <NavLink to="/signup" className="text-[#3A7D44] font-semibold hover:underline ml-1">
                  Sign Up
                </NavLink>
              </div>
            </Form>
          </Formik>
        </div>

      </div>

      <svg
        className="absolute top-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#3A7D44"
          fillOpacity="1"
          d="M0,96C0,96,144,128,288,128C432,128,576,64,720,64C864,64,1008,128,1152,160C1296,192,1440,128,1440,128V0H0V96Z"
        ></path>
      </svg>

      <svg
        className="absolute bottom-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#3A7D44"
          fillOpacity="1"
          d="M0,224C0,224,144,160,288,192C432,224,576,288,720,288C864,288,1008,224,1152,192C1296,160,1440,224,1440,224V320H0V224Z"
        ></path>
      </svg>

    </div>
  );
};

export default LoginPage;

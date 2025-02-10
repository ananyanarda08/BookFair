import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import background1 from "../../assets/images/mainbg1.jpeg";
import CustomInputField from "../../components/CustomInputField";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = (values: any) => {
    if (values.type === "seller") {
      localStorage.setItem("shopName", values.shopName);
    }
    localStorage.setItem("user", JSON.stringify(values));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative bg-[#f7efcf]">
      <div className="absolute inset-0 z-0" />

      <div className="relative flex flex-col lg:flex-row w-full max-w-[900px] bg-white bg-opacity-10 backdrop-blur-lg border-2 border-gray-600 shadow-2xl rounded-2xl overflow-hidden z-10">
        <div
          className="w-full lg:w-1/2 flex flex-col justify-center items-center px-10 bg-transparent backdrop-blur-lg bg-[#B4D6A9] bg-opacity-30 rounded-lg"
          style={{ backgroundImage: `url(${background1})`, backgroundPosition: "center" }}
        ></div>

        <div className="w-full lg:w-1/2 p-5 lg:p-8 border-t lg:border-l border-gray-900 flex flex-col justify-center ">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-center  text-[#3A7D44]">  
            BookFair
          </h2>

          <Formik
            initialValues={{
              name: "",
              email: "",
              type: "",
              password: "",
              shopName: "",
              address: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Name is required"),
              email: Yup.string().email("Invalid email").required("Email is required"),
              password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
              type: Yup.string().oneOf(["buyer", "seller"], "Please select one option").required("Please select a role"),
              shopName: Yup.string().when("type", {
                is: "seller",
                then: (schema) => schema.required("Shop name is required for sellers"),
                otherwise: (schema) => schema.notRequired(),
              }),
              address: Yup.string().when("type", {
                is: "seller",
                then: (schema) => schema.required("Address is required for sellers"),
                otherwise: (schema) => schema.notRequired(),
              }),
            })}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
              const storedUser = localStorage.getItem("user");
              if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.email === values.email) {
                  setFieldError("email", "Email is already registered.");
                  setSubmitting(false);
                  return;
                }
              }

              handleRegister(values);
            }}
          >
            {({ values }) => (
              <Form className="space-y-2  ">
                <CustomInputField
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                  className="bg-transparent border-2 border-[#0e0303] text-[#333333] placeholder-[#B8B8B8] rounded-md focus:ring-2 focus:ring-[#5C6B5C] w-full"
                />

                <CustomInputField
                  label="Email"
                  name="email"
                  type="email"
                   placeholder="Enter Your Email"
                  className="bg-transparent border-2 border-[#0e0303] text-[#333333] placeholder-[#B8B8B8] rounded-md focus:ring-2 focus:ring-[#5C6B5C] w-full"
                />

                <CustomInputField
                  label="Password"
                  name="password"
                  type="password"
                   placeholder="Enter Your Password"
                  className="bg-transparent border-2 border-[#0e0303] text-[#333333] placeholder-[#B8B8B8] p-2 rounded-md focus:ring-2 focus:ring-[#5C6B5C] w-full"
                />
                <div>
                  <label className="block font-medium mb-2">Register As</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <Field type="radio" name="type" value="buyer" className="mr-2" />
                      Buyer
                    </label>
                    <label className="flex items-center">
                      <Field type="radio" name="type" value="seller" className="mr-2" />
                      Seller
                    </label>
                  </div>
                  <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
                </div>

                {values.type === "seller" && (
                  <>
                    <CustomInputField
                      label="Shop Name"
                      name="shopName"
                      type="text"
                      placeholder="Enter Your Shop Name"
                      className="bg-transparent border-2 border-[#0e0303] text-[#333333] placeholder-[#B8B8B8] p-2 rounded-md focus:ring-2 focus:ring-[#5C6B5C] w-full"
                    />

                    <CustomInputField
                      label="Address"
                      name="address"
                      type="text"
                      placeholder="Enter your Address"
                      className="bg-transparent border-2 border-[#0e0303] text-[#333333] placeholder-[#B8B8B8] p-2 rounded-md focus:ring-2 focus:ring-[#5C6B5C] w-full"
                    />
                  </>
                )}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#3A7D44] hover:bg-[#4B5B4B] text-white py-3 px-8 rounded-lg font-semibold transition"
                  >
                    Register
                  </button>
                </div>

                <div className="text-center mt-1">
                  Already have an account?
                  <NavLink to="/" className="text-[#3A7D44] font-semibold hover:underline ml-1">
                    Login
                  </NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <svg className="absolute top-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#3A7D44" fillOpacity="1" d="M0,96C0,96,144,128,288,128C432,128,576,64,720,64C864,64,1008,128,1152,160C1296,192,1440,128,1440,128V0H0V96Z"></path>
      </svg>

      <svg className="absolute bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#3A7D44" fillOpacity="1" d="M0,224C0,224,144,160,288,192C432,224,576,288,720,288C864,288,1008,224,1152,192C1296,160,1440,224,1440,224V320H0V224Z"></path>
      </svg>
    </div>
  );
};

export default RegisterPage;

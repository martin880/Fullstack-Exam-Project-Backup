import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const google = () => {
    window.open("http://localhost:5000/oauth/google", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/oauth/facebook", "_self");
  };

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <form onSubmit={Auth} className="bg-white p-8 shadow-md rounded">
              {isError && <p className="text-center text-red-600">{message}</p>}
              <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                />
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
              <div className="flex space-x-4 justify-center">
                <button
                  className="flex items-center px-4 py-1 space-x-2 border rounded-lg hover:bg-red-500 bg-red-600"
                  onClick={google}
                >
                  <img src={Google} alt="Google icon" className="w-6 h-6 " />
                  <span className="text-xs font-medium text-white">
                    Continue with Google
                  </span>
                </button>
                <button
                  className="flex items-center px-4 py-1 space-x-2 border rounded-lg hover:bg-blue-500 bg-blue-600"
                  onClick={facebook}
                >
                  <img src={Facebook} alt="Facebook icon" className="w-6 h-6" />
                  <span className="text-xs font-medium text-white">
                    Continue with Facebook
                  </span>
                </button>
              </div>
              <div className="text-center">
                <Link
                  to={"/register"}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

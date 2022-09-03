import React, { useState } from "react";
import ReactTyped from "react-typed";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.prevent.default();
  };
  return (
    <>
      <div className="bg-white h-screen w-screen main-layout">
        <h1 className="flex items-center text-4xl font-bold font-serif text-white w-screen h-16 bg-black pl-4">
          Design.in
        </h1>
        <div className="h-screen flex justify-center flex-col items-center">
          <h1 className="text-7xl font-mono text-slate-800 font-bold">
            <ReactTyped
              strings={["Create:)", "Design", "Export"]}
              typeSpeed={100}
              backSpeed={50}
            />
          </h1>
          <button className="px-20 mt-80 py-2 bg-teal-500 w-auto h-auto rounded">
            <h1 className="text-2xl font-bold text-white">Login</h1>
          </button>
        </div>
      </div>
      <div className="form-layout w-screen bg-white h-96 flex flex-col gap-10">
        <h1 className="flex items-center justify-center text-4xl font-bold font-serif text-white w-screen h-16 bg-black pl-4">
          Log Into Design.in
        </h1>
        <form onSubmit={onSubmit}>
          <div className="relative w-9/12 ml-auto mr-auto mb-3">
            <input
              type="email"
              name="email"
              className="border-2 border-gray-400 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
              placeholder="Email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="relative w-9/12 ml-auto mr-auto mb-3">
            <input
              type="password"
              name="password"
              className="border-2 border-gray-400 p-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:border-blue w-full"
              placeholder="Password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="text-center m-auto bg-black w-9/12 mt-6">
            <input
              type="submit"
              name="login"
              id="login"
              value="Submit"
              className="cursor-pointer bg-blue text-white hover:bg-opacity-90 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:bg-opacity-90"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;

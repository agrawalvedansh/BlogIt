import React from "react";

import { Button, Input } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

const Login = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  loading,
}) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <div className="w-full max-w-md">
      <h2 className="mt-6 text-center text-3xl font-extrabold leading-9 text-gray-700">
        Log In
      </h2>
      <div className="text-center">
        <Link
          className="mt-2 text-sm font-medium text-indigo-500 transition duration-150 ease-in-out focus:underline focus:outline-none"
          to="/signup"
        >
          Or Register Now
        </Link>
      </div>
      <div className="mt-8 flex flex-col gap-y-6">
        <Input
          required
          label="Email"
          placeholder="oliver@example.com"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          placeholder="********"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div>
          <Button
            label="Sign In"
            loading={loading}
            type="submit"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Login;

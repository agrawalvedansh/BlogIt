import React, { useState, useEffect } from "react";

import { Select, Button, Input } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

import organizationsApi from "apis/organizations";
import { PageLoader } from "components/commons";

const Signup = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  organization,
  setOrganization,
  password,
  setPassword,
  loading,
  passwordConfirmation,
  setPasswordConfirmation,
}) => {
  const [options, setOptions] = useState([]);
  const [loadingForm, setLoadingForm] = useState(true);

  const fetchOrganizations = async () => {
    try {
      const {
        data: { organizations },
      } = await organizationsApi.fetch();

      setOptions(() =>
        organizations.map(({ id, name }) => ({ value: id, label: name }))
      );
    } catch (error) {
      logger.error(error);
    } finally {
      setLoadingForm(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  if (loadingForm) {
    return <PageLoader />;
  }

  const handleChange = selectedOption => {
    setOrganization(selectedOption || {});
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50
    px-4 py-12 sm:px-6 lg:px-8 "
    >
      <div className="w-full max-w-md">
        <h2
          className="mt-6 text-center text-3xl font-extrabold
        leading-9 text-gray-700"
        >
          Sign Up
        </h2>
        <div className="text-center">
          <Link
            to="/"
            className="mt-2 text-center text-sm font-medium
            text-bb-purple transition duration-150 ease-in-out
            focus:underline focus:outline-none"
          >
            Or Login Now
          </Link>
        </div>
        <div className="mt-8 flex flex-col gap-y-6">
          <Input
            required
            label="Name"
            placeholder="Oliver"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            required
            label="Email"
            placeholder="oliver@example.com"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Select
            {...{ options }}
            required
            label="Organization"
            placeholder="Search organization"
            value={organization}
            onChange={handleChange}
          />
          <Input
            required
            label="Password"
            placeholder="********"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            required
            label="Password Confirmation"
            placeholder="********"
            type="password"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
          />
          <div>
            <Button
              className="neetix-button--primary"
              label="Sign Up"
              loading={loading}
              size="medium"
              type="submit"
              onClick={() => handleSubmit()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

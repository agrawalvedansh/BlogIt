import React, { useState } from "react";

import authApi from "apis/auth";
import SignupForm from "components/Authentication/Form/Signup";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState({});
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await authApi.signup({
        name,
        email,
        organization_id: organization.value,
        password,
        password_confirmation: passwordConfirmation,
      });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <SignupForm
      {...{
        handleSubmit,
        loading,
        email,
        setEmail,
        organization,
        setOrganization,
        name,
        setName,
        password,
        setPassword,
        passwordConfirmation,
        setPasswordConfirmation,
      }}
    />
  );
};

export default Signup;

import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./hooks/useLogin";
import { LoaderIcon } from "react-hot-toast";

function LoginForm() {
  const { Login, isLogin } = useLogin();
  const [email, setEmail] = useState("ahmed_elsayed@yahoo.com");

  const [password, setPassword] = useState("123456");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return null;
    Login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          disabled={isLogin}
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          disabled={isLogin}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button sizes="large" variation="primary">
          {isLogin && <LoaderIcon />}Login
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;

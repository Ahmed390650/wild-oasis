import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./hooks/useSignUp";
// Email regex: /\S+@\S+\.\S+/
type formType = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
function SignupForm() {
  const { SignUp, isSigning } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<formType>();
  const { errors } = formState;

  function onSubmit({ email, password }: formType) {
    SignUp(
      { email, password },
      {
        onSettled() {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigning}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigning}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}>
        <Input
          type="password"
          disabled={isSigning}
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          disabled={isSigning}
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          disabled={isSigning}
          type="reset"
          onClick={() => reset()}>
          Cancel
        </Button>
        <Button disabled={isSigning}> Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

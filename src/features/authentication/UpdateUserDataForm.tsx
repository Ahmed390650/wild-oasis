import React, { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUser from "./hooks/useUser";
import useUpdateUser from "./hooks/useUpdateUser";
import { LoaderIcon } from "react-hot-toast";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const { UpdateUser, isUpdating } = useUpdateUser();
  const email = user?.email;
  const currentFullName = user?.user_metadata?.fullName || "";
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<undefined | File>(undefined);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    UpdateUser({ avatar, fullName });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          disabled={isUpdating}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          type="file"
          onChange={(e) => {
            const fileList = e.target.files;
            if (!fileList || fileList.length === 0) return;
            setAvatar(fileList[0]);
          }}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isUpdating} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button variation="primary" disabled={isUpdating}>
          {isUpdating && <LoaderIcon />}Update account
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

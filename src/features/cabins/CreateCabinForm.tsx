import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import toast, { LoaderIcon } from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import useCabinCreate from "./hooks/useCabinCreate";
import useCabinUpdate from "./hooks/useCabinUpdate";
import { GetCabines } from "../../services/apiCabines";
import { BiSave } from "react-icons/bi";
type CabinForm = Omit<Cabin, "image" | "createAt"> & {
  image: FileList | string;
  createdAt?: Date;
  id?: number;
};

type typeCabin = Awaited<ReturnType<typeof GetCabines>>[0];

function CreateCabinForm({
  editCabin,
  onCloseModel,
}: {
  editCabin?: typeCabin;
  onCloseModel?: () => void;
}) {
  const defaultValues = editCabin ? { ...editCabin } : {};
  const { register, handleSubmit, reset, formState, getValues } =
    useForm<CabinForm>({ defaultValues });
  const { errors } = formState;

  const { mutate: createCabin, isLoading: isUpdating } = useCabinCreate();
  const { mutate: newCabin, isLoading: isCreating } = useCabinUpdate();
  const onSubmit = (data: CabinForm) => {
    toast.loading("Created ...", { id: "create" });
    const isImageString = typeof data.image === "string";
    const image = isImageString
      ? (data.image as string)
      : (data.image as FileList)[0];
    if (editCabin) {
      newCabin(
        { variables: { ...data, image }, id: editCabin.id },
        {
          onSuccess() {
            reset();
            onCloseModel?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess() {
            reset();
            onCloseModel?.();
          },
        }
      );
    }
  };
  const isLoading = isUpdating || isCreating;
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModel ? "modal" : "regular"}>
      <FormRow label="name" error={errors["name"]?.message?.toString()}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "this valid is required" })}
        />
      </FormRow>
      <FormRow
        label="maxCapacity"
        error={errors["maxCapacity"]?.message?.toString()}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: "this valid is required" })}
        />
      </FormRow>

      <FormRow
        label="regularPrice"
        error={errors["regularPrice"]?.message?.toString()}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "this valid is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors["discount"]?.message?.toString()}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this valid is required",
            validate: (value) =>
              value <= getValues()["regularPrice"] ||
              "Discount should be less than regualar price",
          })}
        />
      </FormRow>

      <FormRow
        label="description"
        error={errors["description"]?.message?.toString()}>
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", { required: "this valid is required" })}
        />
      </FormRow>
      <FormRow label="image">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image")}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            type="reset"
            variation="secondary"
            onClick={() => onCloseModel?.()}
            sizes="medium">
            Cancel
          </Button>
          <Button variation="primary" sizes="medium" disabled={isLoading}>
            {isLoading ? <LoaderIcon /> : <BiSave />}Save
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

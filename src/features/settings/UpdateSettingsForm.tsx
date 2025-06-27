import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSetting from "./useSetting";
import useSettingAdd from "./useSettingAdd";
import toast from "react-hot-toast";
function UpdateSettingsForm() {
  const { data, isLoading, error } = useSetting();
  const { mutate, isLoading: isUpdating } = useSettingAdd();
  const { breakfastPrice, maxBookinglength, maxGuestPerBooking, minBookingLength } = data ?? {}

  type settingType = keyof (typeof data)
  if (error) return null;
  if (isLoading) return <Spinner />
  if (!data) return null;
  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!value || data[name as settingType] == +value) return;
    toast.loading("Loading", { id: "create" });
    mutate({ [name]: value });
  };
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input disabled={isUpdating} type="number" id="min-nights" name="minBookingLength" onBlur={handleUpdate} defaultValue={minBookingLength || 0} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input disabled={isUpdating} type="number" id="max-nights" onBlur={handleUpdate} name="maxGuestPerBooking" defaultValue={maxGuestPerBooking || 0} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input disabled={isUpdating} type="number" id="max-guests" onBlur={handleUpdate} name="maxBookinglength" defaultValue={maxBookinglength || 0} />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input disabled={isUpdating} type="number" id="breakfast-price" onBlur={handleUpdate} name="breakfastPrice" defaultValue={breakfastPrice || 0} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;

import supabase, { supabaseUrl } from "./supabase";

const GetCabines = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error(error.details);
  }
  return data as Cabin[];
};
const DeleteCabin = async (id: number) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(error.details);
  }
  return data;
};
type cabineForm = Omit<Cabin, "image" | "id" | "createdAt"> & { image: File | string, id?: number, createdAt?: Date };
const createEditCabin = async (cabin: cabineForm, id?: number) => {
  const hasImagePath = (cabin.image as string)?.startsWith?.(supabaseUrl);
  const imageName =
    !hasImagePath &&
    `${Math.random()}-${(cabin.image as File).name}`.replace("/", "");
  const imagePath = hasImagePath
    ? (cabin.image as string)
    : `${supabaseUrl}/storage/v1/object/public/cabine-img//${imageName}`;
  // 1. create cabin
  let query;
  if (!id) {
    query = supabase.from("cabines").insert([{ ...cabin, image: imagePath }]);
  }
  if (id) {
    query = supabase
      .from("cabins")
      .update({ ...cabin, image: imagePath })
      .eq("id", id);
  }
  const { data, error } = await query!.select();
  if (error) {
    console.error(error);
    throw new Error(error.details);
  }
  // Use the JS library to create a bucket.
  if (imageName) {
    const { error: storageError } = await supabase.storage
      .from("cabine-img")
      .upload(imageName, cabin.image);
    if (storageError) {
      await DeleteCabin(data[0].id as number);
      throw new Error(storageError.message);
    }
  }
  return data;
};
export { GetCabines, DeleteCabin, createEditCabin };

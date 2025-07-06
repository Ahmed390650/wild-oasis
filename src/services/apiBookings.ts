import { Database } from "../../database.types";
import { PAGE_SIZE } from "../utils/config";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";
type fieldName = keyof Database["public"]["Tables"]["booking"]["Row"];
export type row = Database["public"]["Tables"]["booking"]["Row"];


type getBookingType = {
  filter?: { columnName: fieldName, columnValue: string },
  sortBy?: {
    field: fieldName | string;
    sortby: string;
  }
  page?: number;
}

export async function getBooking({ filter, sortBy, page = 1 }: getBookingType) {
  let query = supabase.from("booking").select("id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)", { count: "exact" });
  if (filter?.columnValue !== null && filter?.columnValue !== "all" && filter) {
    const { columnName, columnValue } = filter;
    query = query.eq(columnName, columnValue);
  }
  if (sortBy?.field) {
    query = query.order(sortBy.field, { ascending: sortBy.sortby === "asc" });
  }
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    query = query.range(from, from + PAGE_SIZE);
  }
  const { error, data, count } = await query
  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  return { data, count };
}
export async function getBookingById(id: number) {
  const { error, data } = await supabase.from("booking").select("*, cabins(name), guests(fullName, email, country, countryFlag, nationalID)").eq("id", id).single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
  return data;
}
// Returns all booking that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("booking")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("booking could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("booking")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("booking could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("booking")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL booking ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("booking could not get loaded");
  }
  return data;
}

export async function updateBooking(id: number, obj: any) {
  const { data, error } = await supabase
    .from("booking")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("booking").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";
import { css } from "styled-components";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options?: { end: boolean }) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value,
  );
export const variations = {
  primary: css`
      color: var(--color-brand-50);
      background-color: var(--color-brand-600);
      &:hover {
        background-color: var(--color-brand-700);
      }
    `,
  secondary: css`
      color: var(--color-grey-600);
      background: var(--color-grey-0);
      border: 1px solid var(--color-grey-200);
      &:hover {
        background-color: var(--color-grey-50);
      }
    `,
  danger: css`
      color: var(--color-red-100);
      background-color: var(--color-red-700);
      &:hover {
        background-color: var(--color-red-800);
      }
    `,
};
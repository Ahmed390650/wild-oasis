import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooking } from "../../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE, statusToTagName } from "../../../utils/config";

const useBooking = () => {
  const queryClient = useQueryClient();
  const [searchParmas] = useSearchParams();
  const columnValue = searchParmas.get(
    "status"
  ) as keyof typeof statusToTagName;
  const search = searchParmas.get("sort") || "startDate-desc";
  const currentPage = !searchParmas.get("page")
    ? 1
    : Number(searchParmas.get("page"));
  const [field, sortby] = search.split("-");
  const sortBy = { field, sortby };

  const query = useQuery({
    queryFn: () =>
      getBooking({
        filter: { columnName: "status", columnValue },
        sortBy,
        page: currentPage, // 20
      }),
    queryKey: ["booking", columnValue, sortBy, currentPage],
  });
  const count = query.data?.count;
  const pageCount = Math.ceil(count! / PAGE_SIZE);
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryFn: () =>
        getBooking({
          filter: { columnName: "status", columnValue },
          sortBy,
          page: currentPage + 1, // 20
        }),
      queryKey: ["booking", columnValue, sortBy, currentPage + 1],
    });
  }
  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryFn: () =>
        getBooking({
          filter: { columnName: "status", columnValue },
          sortBy,
          page: currentPage - 1, // 20
        }),
      queryKey: ["booking", columnValue, sortBy, currentPage - 1],
    });
  }

  return { ...query, booking: query.data?.data, count };
};

export default useBooking;

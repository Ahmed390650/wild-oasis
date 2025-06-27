import { Navigate, RouteObject } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import Cabins from "../pages/Cabins";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import Account from "../pages/Account";
import { ReactNode } from "react";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import BookingDetail from "../features/bookings/BookingDetail";
import Checkin from "../pages/Checkin";
type routesType = RouteObject & {
  name?: string;
  Icon?: ReactNode;
  hidden?: boolean;
};
export const AppRoutes: routesType[] = [
  {
    path: "/",
    index: true,
    element: <Navigate to={"/dashboard"} />,
    name: "home",
    Icon: <HiOutlineHome />,
  },
  {
    element: <BookingDetail />,
    path: "/bookings/:id",
    hidden: true,
  },
  {
    element: <Checkin />,
    path: "/checkin/:id",
    hidden: true,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    name: "dashboard",
    hidden: true,
  },
  {
    path: "/bookings",
    element: <Bookings />,
    name: "bookings",
    Icon: <HiOutlineCalendarDays />,
  },
  {
    path: "/cabins",
    element: <Cabins />,
    name: "cabine",
    Icon: <HiOutlineHomeModern />,
  },
  {
    path: "/users",
    element: <Users />,
    name: "users",
    Icon: <HiOutlineUsers />,
  },
  {
    path: "/settings",
    element: <Settings />,
    name: "settings",
    Icon: <HiOutlineCog6Tooth />,
  },
  {
    path: "/account",
    element: <Account />,
    name: "account",
    hidden: true,
  },
];
export const statusToTagName = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};
export const PAGE_SIZE = 6;

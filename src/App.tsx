import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyle from "./styles/GlobalStyle";
import AppLayout from "./ui/AppLayout";
import { AppRoutes } from "./utils/config";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: AppRoutes,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);
const App = () => {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
};

export default App;

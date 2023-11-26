import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/mainLayout.jsx";
import ErrorPage from "../pages/errorPage.jsx";
import Home from "../pages/home";
import Registration from "../pages/registration.jsx";
import Signin from "../pages/signin.jsx";

const CustomRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("/reviews.json"),
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
]);

export default CustomRouter;

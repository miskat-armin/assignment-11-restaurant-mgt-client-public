import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/mainLayout.jsx";
import ErrorPage from "../pages/errorPage.jsx";
import Home from "../pages/home";
import Registration from "../pages/registration.jsx";
import Signin from "../pages/signin.jsx";
import Items from "../pages/items.jsx";
import Blog from "../pages/blog.jsx";
import AddItem from "../pages/addItem.jsx";
import Item from "../pages/item.jsx";
import OrderPage from "../pages/orderPage.jsx";

const CustomRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/all-items",
        element: <Items />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/add-item",
        element: <AddItem />,
      },
      {
        path: "all-items/:item",
        element: <Item />,
      },
      {
        path: "/order-item",
        element: <OrderPage />,
      },
      
    ],
  },
]);

export default CustomRouter;

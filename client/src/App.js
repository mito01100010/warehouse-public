import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FindProduct from "./pages/FindProduct";
import AddProduct from "./pages/AddProduct";
import "./style.scss";
import UpdateProduct from "./pages/UpdateProduct";
import PrivateRoutes from "./pages/utils/PrivateRoutes";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/findProduct",
        element: <FindProduct />
      },
      {
        path: "/addProduct",
        element: <AddProduct />
      },
      {
        path: "/updateProduct/:barcode",
        element: <UpdateProduct />
      }
    ]
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  }
])

function App() {
  return (
    <div className="app">
      <div className="shell">
        <div className="app__inner">
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}

export default App;

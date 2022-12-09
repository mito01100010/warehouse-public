import { useContext } from "react";
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext";
import Layout from "./Layout"

const PrivateRoutes = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    currentUser ? <Layout/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes
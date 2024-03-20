import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  Navigate
} from "react-router-dom";
import Layouts from "./components/Layouts";
import AddUser from "./components/users/AddUser";
import ListUser from "./components/users/ListUser";
import ViewUser from "./components/users/ViewUser";
import EditUser from "./components/users/EditUser";
import PageNotFount from "./components/PageNotFount";

import { useSelector } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layouts/>}>
          <Route 
            path="/"
            element = {<PrivateRoute><ListUser /></PrivateRoute>}
          />
          <Route 
           path="/addUser"
           element = {<PrivateRoute><AddUser /></PrivateRoute>}
          />
          <Route 
           path="/listUser"
           element = {<PrivateRoute><ListUser /></PrivateRoute>}
          />
          <Route 
           path="/viewUser/:id"
           element = {<PrivateRoute><ViewUser /></PrivateRoute>}
          />
          <Route 
           path="/editUser/:editId"
           element = {<PrivateRoute><EditUser /></PrivateRoute>}
          />
          <Route 
           path="*"
           element = {<PageNotFount />}
          />
      </Route>
  )
)

//authenticated user access
function PrivateRoute({ children }) {
  const {user} = useSelector((state)=>state.auth);
  return user?.username=="Admin" ? children : <Navigate to="/" />;
}
export {router}
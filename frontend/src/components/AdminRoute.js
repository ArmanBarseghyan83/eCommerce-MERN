import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Meta from './Meta'

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <>
    <Meta title="Admin"/>
    <Outlet />
    </>
  ) : (
    <Navigate to='/login' replace />
  );
};
export default AdminRoute;

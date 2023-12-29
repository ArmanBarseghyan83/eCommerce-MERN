import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Meta from './Meta';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? (
    <>
      <Meta title={userInfo.name} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default PrivateRoute;

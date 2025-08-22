// hooks/useAuth.ts
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from '@/store';
import { loginUser, logout } from '@/slices/authSlice';
import useDispatc

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: IRootState) => state.auth);

  const login = (credentials: { username: string; password: string }) => {
    dispatch(loginUser(credentials));
  };

  const signOut = () => {
    dispatch(logout());
  };

  const resetError = () => {
    dispatch(clearError());
  };

  return {...authState, login, logout: signOut, clearError: resetError, };
};

function clearError(): any {
    throw new Error('Function not implemented.');
}

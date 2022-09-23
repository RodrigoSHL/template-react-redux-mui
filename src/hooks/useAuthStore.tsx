import { authApi } from "../api";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { errorColor, successColor } from "../components/Middleware/Snackbar";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../features/auth/authSlice";
import { onLogoutCalendar } from "../features/calendar/calendarSlice";
import { setOpenSnackbar } from "../features/snackbar/snackbarSlice";
import { IUserLogin } from "../interfaces/IUserLogin.interface";
const objError = {isOpen: true,message: 'Problems with server',severity: errorColor,timeOut : 4000}
const objSuccess = {isOpen: true,message: 'Bienvenido',severity: successColor,timeOut : 4000}

export const useAuthStore = () => {
  const { status, user, errorMessage }: any = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const startLogin = async ({ email, password }: IUserLogin) => {
    dispatch(onChecking());
    try {
      const { data } = await authApi.post("auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data._doc.name, uid: data._doc._id }));
      dispatch(setOpenSnackbar(objSuccess))
    } catch (error) {
      dispatch(onLogout("Incorrect credentials"));
      dispatch(setOpenSnackbar(objError))
      setTimeout(() => {
        dispatch(clearErrorMessage);
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout("Authentication error"));
    try {
      const { data } = await authApi.get("auth/check-status");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data._doc.name, uid: data._doc._id, roles: data._doc.roles }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout("Unauthorized"));
    }
  };

  const startLogout = async () => {
    localStorage.clear();
    dispatch(onLogoutCalendar());
    dispatch(onLogout('Closed'));
  }

  return {
    //* Properties
    errorMessage,
    status,
    user,

    //* Methods
    checkAuthToken,
    startLogin,
    startLogout,
  };
};

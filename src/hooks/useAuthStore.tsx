import { authApi } from "../api";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../features/auth/authSlice";
import { IUserLogin } from "../interfaces/IUserLogin.interface";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const startLogin = async ({ email, password }: IUserLogin) => {
    dispatch(onChecking());
    try {
      const { data } = await authApi.post("auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({name: data._doc.name, uid: data._doc._id}));
    } catch (error) {
      dispatch(onLogout('Incorrect credentials'));
      setTimeout(() => {
        dispatch(clearErrorMessage)
      }, 10)
    }
  };

  return {
    //* Properties
    errorMessage,
    status,
    user,

    //* Methods
    startLogin,
  };
};

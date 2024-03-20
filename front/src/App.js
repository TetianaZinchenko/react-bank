import "./App.css";

import { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { toast } from "react-hot-toast";

import { AuthRoute } from "./contexts/authRoute";
import { PrivateRoute } from "./contexts/privateRoute";

import authContext, {
  AppReducer,
  defaultState,
  setUser,
} from "./contexts/authContext";

import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme/theme";

import WelcomePage from "./pages/wellcomePage";
import SignupPage from "./pages/signupPage";
import SigninPage from "./pages/signInPage";
import RecoveryPage from "./pages/recoveryPage";
import RecoveryConfirmPage from "./pages/recoveryConfirmPage";
import SignupConfirmPage from "./pages/signUpConfirmPage";
import BalancePage from "./pages/balancePage";
import NotificationsPage from "./pages/notificationsPage";
import SettingsPage from "./pages/settingsPage";
import RecievePage from "./pages/recievePage";
import SendPage from "./pages/sendPage";
import TransactionPage from "./pages/transactionPage";

import { Layout } from "./components/Layout";

const URL = "http://localhost:5000/api/auth/auth";

function App() {
  const [state, dispatch] = useReducer(AppReducer, defaultState);

  const auth = async () => {
    try {
      let res = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      res = await res.json();
      return res;
    } catch (error) {
      toast.error(error);
    }
  };

  const getAuthByToken = async () => {
    let res = await auth();
    dispatch(setUser(res.user));
  };

  useEffect(() => {
    if (localStorage.token) getAuthByToken();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <authContext.Provider value={{ state, dispatch }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <AuthRoute>
                    <WelcomePage />
                  </AuthRoute>
                }
              ></Route>
              <Route
                path={"/signup"}
                element={
                  <AuthRoute>
                    <SignupPage />
                  </AuthRoute>
                }
              ></Route>
              <Route
                path={"/signin"}
                element={
                  <AuthRoute>
                    <SigninPage />
                  </AuthRoute>
                }
              ></Route>
              <Route
                path={"/recovery"}
                element={
                  <AuthRoute>
                    <RecoveryPage />
                  </AuthRoute>
                }
              ></Route>
              <Route
                path={"/recovery-confirm"}
                element={
                  <AuthRoute>
                    <RecoveryConfirmPage />
                  </AuthRoute>
                }
              ></Route>
              <Route
                path={"/signup-confirm"}
                element={
                  <PrivateRoute>
                    <SignupConfirmPage />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path={"/balance"}
                element={
                  <PrivateRoute>
                    <BalancePage />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path={"/notifications"}
                element={
                  <PrivateRoute>
                    <NotificationsPage />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path={"/settings"}
                element={
                  <PrivateRoute>
                    <SettingsPage />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path={"/recive"}
                element={
                  <PrivateRoute>
                    <RecievePage />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path={"/send"}
                element={
                  <PrivateRoute>
                    <SendPage />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path={"/transaction/:transactionId"}
                element={
                  <PrivateRoute>
                    <TransactionPage />
                  </PrivateRoute>
                }
              ></Route>
              <Route path={"*"} element={Error}></Route>
            </Route>
          </Routes>
        </authContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

import React, { createContext, useState, useContext, useEffect, useCallback, useMemo, createRef, useImperativeHandle } from 'react';
import Login from '../component/Login';

const AuthContext = createContext({});

const contextRef = createRef();

export function AuthProvider({ authService, children }) {
  const [user, setUser] = useState(undefined);

  useImperativeHandle(contextRef, () => (user ? user.token : undefined));

  useEffect(() => {
    authService.me().then(setUser).catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (id, pw, name, nick, email, addr, gender, classification) =>
      authService.signup(id, pw, name, nick, email, addr, gender, classification).then((user) => setUser(user)),
    [authService]
  );

  const logIn = useCallback(
    async (id, pw) =>
      authService.login(id, pw).then((user) => {
        setUser(user);
      }),
    [authService]
  );

  const kakaoLogIn = useCallback(
    async (code) =>
      authService.kakaoLogin(code).then((user) => {
        setUser(user);
      }),
    [authService]
  );

  const logOut = useCallback(async () => authService.logout().then(() => setUser(undefined)), [authService]);

  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      kakaoLogIn,
      logOut,
    }),
    [user, signUp, logIn, logOut, kakaoLogIn]
  );

  return (
    <AuthContext.Provider value={context}>
      {user ? children : <Login onLogin={logIn} onSignup={signUp} onKakao={kakaoLogIn} />}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
export const fetchToken = () => contextRef.current;

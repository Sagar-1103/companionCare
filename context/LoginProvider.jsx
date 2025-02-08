import {useContext, createContext, useState} from 'react';

const LoginContext = createContext();

const LoginProvider = props => {
  const [user,setUser] = useState(null);
  const [accessToken,setAccessToken] = useState(null);
  const [refreshToken,setRefreshToken] = useState(null);
    return (
    <LoginContext.Provider
      value={{user,setUser,accessToken,setAccessToken,refreshToken,setRefreshToken}}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export const useLogin = () => useContext(LoginContext);
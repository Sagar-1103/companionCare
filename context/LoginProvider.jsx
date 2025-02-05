import {useContext, createContext} from 'react';

const LoginContext = createContext();

const LoginProvider = props => {
    return (
    <LoginContext.Provider
      value={{}}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export const useLogin = () => useContext(LoginContext);
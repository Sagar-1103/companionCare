import {useContext, createContext, useState} from 'react';

const LoginContext = createContext();

const LoginProvider = props => {
  const [user,setUser] = useState(null);
  const [accessToken,setAccessToken] = useState(null);
  const [refreshToken,setRefreshToken] = useState(null);
  const [done,setDone] = useState(false);
  const [medications,setMedications] = useState(false);
  const [diseases,setDiseases] = useState([]);
    return (
    <LoginContext.Provider
      value={{user,setUser,done,setDone,medications,setMedications,accessToken,setAccessToken,refreshToken,setRefreshToken,diseases,setDiseases}}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export const useLogin = () => useContext(LoginContext);
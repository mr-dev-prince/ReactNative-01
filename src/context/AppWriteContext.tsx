import React, {FC, PropsWithChildren, createContext, useState} from 'react';

import AppwriteService from '../appwrite/service';

type AppContextType = {
  appwrite: AppwriteService;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const AppwriteContext = createContext<AppContextType>({
  appwrite: new AppwriteService(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AppWriteProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const defaultValue = {
    appwrite: new AppwriteService(),
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

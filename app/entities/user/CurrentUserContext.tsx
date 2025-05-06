import {createContext, useContext} from 'react';
import type {User} from '../../shared/api/models/models';

export const CurrentUserContext = createContext<User | null>(null);

export const useCurrentUser = () => {
    const currentUserContext = useContext(CurrentUserContext);
  
    return currentUserContext;
  };
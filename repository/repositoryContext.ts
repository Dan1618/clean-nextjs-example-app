import { createContext } from 'react';
import { IRepository } from './repository.interface';

export const RepositoryContext = createContext({repository: {} as IRepository});
import { createContext, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { api } from './services/api';


export const TransactionsContext = createContext<Transaction[]>([]);

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionsProviderProps {
    children: ReactNode; //Aceita qualquer tipo de conteúdo do React (JSX, texto e outros)
}


export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api('/transactions')
            .then(response => {
                return setTransactions(response.data['transactions']);
            });
    }, []);

    return (
        <TransactionsContext.Provider value={transactions}>
            {children}
        </TransactionsContext.Provider>
    )
}




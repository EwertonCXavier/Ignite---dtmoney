import { createContext, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { api } from './services/api';


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

// interface TransactionInput {
//     title: string;
//     amount: number;
//     type: string;
//     category: string;
// }


type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; 
    //Sintaxe para declaração de tipos em que é possível omitir alguns campos da referência

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>
// 3° opção para declaração de tipos que derivam


interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => void;
}



export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api('/transactions')
            .then(response => {
                return setTransactions(response.data['transactions']);
            });
    }, []);

    function createTransaction(transaction: TransactionInput) {    
        api.post('/transactions', transaction);
    }

    return (
        <TransactionsContext.Provider value={{
            transactions, createTransaction
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}




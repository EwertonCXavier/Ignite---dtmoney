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

// Utilizado para permitir a inserção de filhos no contexto da aplicação
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
    createTransaction: (transactionInput: TransactionInput) => Promise<void>; // são definidos os dados que são realmente inseridos no popup de cadastro
}



export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]); // Hook de estado para armazenar o array de objetos criados pelo popup

    // UseEffect responsável por pegar dados do miragejs
    useEffect(() => {
        api('/transactions')
            .then(response => {
                return setTransactions(response.data['transactions']);
            });
    }, []);


    // função criada para permitir o POST de dados ( é passada através de contexto )
    async function createTransaction(transactionInput: TransactionInput) {    
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });
        // console.log(Object.keys(response.data));
        const { transaction } = response.data; //erro do axios com tipagem (0.21.0 atual)
        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return (
        <TransactionsContext.Provider value={{
            transactions, createTransaction
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}




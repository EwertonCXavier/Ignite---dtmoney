import {GlobalStyle} from './styles/global';
import {Header} from './components/Header';
import {Dashboard} from './components/Dashboard';
import Modal from 'react-modal';
import { useState } from 'react';
import {NewTransactionModal} from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions'; 


Modal.setAppElement('#root'); // Acessibilidade

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
      setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard />
      <GlobalStyle />
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>
    </TransactionsProvider>
    
  );
}


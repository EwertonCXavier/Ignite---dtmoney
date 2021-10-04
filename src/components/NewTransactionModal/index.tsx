import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/fechar.svg';
import IncomeImg from '../../assets/entradas.svg';
import OutcomeImg from '../../assets/saidas.svg';
import { api } from '../../services/api';



interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}



export function NewTransactionModal ({isOpen, onRequestClose}: NewTransactionModalProps) {
    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    
    
    function handleCreateNewTransaction (event: FormEvent) {
        event.preventDefault();
        const data = {
            title,
            value,
            category,
            type
        };

        api.post('/transactions', data);
    }

    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
        >
          <button 
            className="react-modal-close" 
            type="button" 
            onClick={onRequestClose}
            >
              <img src={closeImg} alt="Fechar popup" />
          </button>
          <Container onSubmit={(event) => handleCreateNewTransaction(event)}>
            <h2>Cadastrar transação</h2>
            <input 
                placeholder="Título"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <input
                type="number"
                placeholder="Valor"
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
            />
            <TransactionTypeContainer>
                <RadioBox 
                    type="button"
                    onClick={() => setType('deposit')}
                    isActive={type === 'deposit'}
                    activeColor="green"
                >
                    <img src={IncomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadioBox>
                <RadioBox 
                    type="button"
                    className= {type === 'withdraw' ? 'active' : ''}
                    onClick={() => setType('withdraw')}
                    isActive={type === 'withdraw'}
                    activeColor="red"
                >
                    <img src={OutcomeImg} alt="Saída" />
                    <span>Saída</span>
                </RadioBox>    

            </TransactionTypeContainer>
            <input
                placeholder="Categoria"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            />
            <button type="submit">Cadastrar</button>

          </Container>
      </Modal>
    )
}
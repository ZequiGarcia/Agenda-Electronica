import { useSelector, useDispatch } from 'react-redux';
import { onOpenDateModal, onCloseModalOpen } from '../store';


export const useUiStore = () => {
    const { 
        isDateModalOpen 
    } = useSelector( state => state.ui );

    const dispatch = useDispatch();

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    //?  aqui esta para cerrar el modal
   
    const closeDateModal = () =>{
        dispatch( onCloseModalOpen() );
    }

    return {
        //? aqui se retornar las propiedades 
        isDateModalOpen,

        //? Metodos
        openDateModal,
        closeDateModal,
    }
}
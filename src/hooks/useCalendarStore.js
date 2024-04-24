import { useDispatch, useSelector } from "react-redux";
import { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        //? Idealmente proceso deberian de llegar aca desde el back-end

        if ( calendarEvent._id)  {
            //? Estamos haciendo una modificacion a la nota
            dispatch( onUpdateEvent( { ...calendarEvent } ) );

        } else {
            //? creando una nueva nota
            dispatch( onAddNewEvent( { ...calendarEvent, _id: new Date().getTime() } ) );
        }
    }

    const startDeletingEvent = () => {
        dispatch( onDeleteEvent() );
    };

    return {
        //? Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //? Metodos
        setActiveEvent,
        startDeletingEvent,
        startSavingEvent,
    }
}

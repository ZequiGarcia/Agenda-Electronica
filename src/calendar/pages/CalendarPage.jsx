import { Calendar} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

    const { openDateModal } = useUiStore();

    const { events, setActiveEvent } = useCalendarStore();

    const [ lastView, setLastView ]= useState( localStorage.getItem( 'lastView' ) || 'agenda' )

    const eventeStyleGetter = ( event, start, end, isSelected ) => {
        // console.log(event, start, end, isSelected);
        const style ={
            backgroundColor: '#527375',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return{
            style
        }
    }

    const onCoubleClick = ( event ) => {
        //console.log({ doubleClick: event})
        openDateModal();
    }

    const onSelect = ( event ) => {
        setActiveEvent ( event );
    }
    const onViewChange = ( event ) => {
        localStorage.setItem( 'lastView', event )
        setLastView( event );
    }

    return(
        <>
            <NavBar />
            &nbsp;
            <Calendar
                culture='es'
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={ getMessagesES() }
                eventPropGetter={ eventeStyleGetter }
                components={{
                    event: CalendarEvent
                }}

                //Colocar loe eventos qui
                onDoubleClickEvent={ onCoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChange }
                defaultView={ lastView }
            />

            <CalendarModal/>
            <FabAddNew />
            <FabDelete />

        </>
    )
}
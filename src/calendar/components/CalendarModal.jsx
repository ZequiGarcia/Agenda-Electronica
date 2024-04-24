import { addHours, differenceInSeconds } from "date-fns";
import { useState, useMemo } from "react";
import Modal from "react-modal";
import Datepicker, {registerLocale} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import Swal from 'sweetalert2'
import { useCalendarStore, useUiStore } from "../../hooks";
import { useEffect } from "react";

  registerLocale('es', es) 

  const customStyles = {

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  Modal.setAppElement('#root');//es la que ayuda a la que se pueda sobreponer ante todo

  export const CalendarModal = () => {

    //? Estado de nuestro hooks
    const { isDateModalOpen, closeDateModal } = useUiStore();

    //? extraer las dependencias que nos interesena de useCalendarStore
    const { activeEvent, startSavingEvent } = useCalendarStore();

    //nuevo estado para cuando se ingrese el evento
    const [ formSubmitted, setFormSubmitted ] = useState( false );

    const [ formValues, setFormValues ]= useState( {
      title: '',
      notes: '',
      start: new Date(),
      end: addHours (new Date(), 2),
    } );

    //utilizamos el useMemo
    const titleClass = useMemo( () => {

      if ( !formSubmitted ) return '';

      return ( formValues.title.length > 0 )? 'is-valid' : 'is-invalid'

    }, [ formValues.title, formSubmitted ] )

    //? crear useEffect
    useEffect( () => {
      if( activeEvent !== null ){
        setFormValues( {...activeEvent } )
      }
    },[ activeEvent ])

    const onInputChange = ( { target } ) => { setFormValues( {
      ...formValues,
      [ target.name ] : target.value
    } ) }

    const onDateChanged = ( event, changing ) => { setFormValues( {
      ...formValues,
      [ changing ] : event
    } ) }

    const onCloseModal = () => {
        console.log( 'cerrando el modal....' )
        closeDateModal();
        //setIsOpen(false);
    }

    const onSubmit = async ( event ) => {
      event.preventDefault();
      setFormSubmitted( true );
      
      const difference = differenceInSeconds( formValues.end, formValues.start );
      console.log( { difference } );

      if ( isNaN( difference ) || difference <= 0 ) {
        Swal.fire( 'Fechas Incorrectas', 'Por favor revisa las fechas ingresadas', 'error' )
        return;
      }

      if ( formValues.title.length <= 0 ) {
        console.log( 'Es necesario indicar un titulo al evento' )
        return;
      }
      console.log( formValues )

      await startSavingEvent( formValues );

      closeDateModal();

      setFormSubmitted( false );

    }
    
    return(
          <Modal
              isOpen={ isDateModalOpen }
              onRequestClose={ onCloseModal }
              style={ customStyles }

              className='modal'//asi se llama la clase ne css
              overlayClassName='modal-fondo'//clase de css
              closeTimeoutMS={ 200 }
          >
            <h2>Nuevo Evento</h2>
            <hr />
            <form className="container" onSubmit={ onSubmit } >

              <div className="form-group mb-2">
                <label>Fecha y hora de inicio</label>
                <Datepicker
                  selected={ formValues.start }//fecha de inicio seleccionada
                  className="form-control"// clase de bootstrap
                  onChange={ ( event ) => onDateChanged( event, 'start' ) }
                  dateFormat='Pp'
                  showTimeSelect
                  locale="es"
                  timeCaption='Hora'
                />
              </div>

              <div className="form-group mb-2">
                <label>Fecha y hora de fin</label>
                <Datepicker
                // minDate={formValues.start}
                  selected={ formValues.end }//fecha de inicio seleccionada
                  className="form-control"// clase de bootstrap
                  onChange={ ( event ) => onDateChanged( event, 'end' ) }
                  dateFormat='Pp'
                  showTimeSelect
                  locale="es"
                  timeCaption="Hora"
                />            
              </div>
              <hr />

              <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                  type="text"
                  className={ `form-control ${ titleClass }` }
                  placeholder="Titulo del evento"
                  autoComplete="off"
                  name="title"
                  value={ formValues.title }
                  onChange={ onInputChange }
                />
                <small className="form-text text-muted">Una descipcion corta</small>
              </div>

              <div className="form-group mb-2">
                <textarea 
                type="text"
                className="form-control"
                placeholder="Notas"
                rows="5"
                name="notes"

                value={ formValues.notes }
                onChange={ onInputChange }
                >

                </textarea>
                <small className="form-text text-muted">Informacion adicional</small>
              </div>

              <button 
            type="submit" 
            className="btn btn-outline-primary btn-block"
            >
              <i className="fas fa-save"></i>
              &nbsp;
              <span>Guardar</span>
            </button>

            </form>


            

        </Modal>
    )
  }

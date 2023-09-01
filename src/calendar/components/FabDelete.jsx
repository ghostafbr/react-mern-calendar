import {useCalendarStore } from "../../hooks";

export const FabDelete = () => {

    const { startDeletingEvent, hasEventsSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
            style={{ display: hasEventsSelected ? '' : 'none' }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    );
};

export default FabDelete;

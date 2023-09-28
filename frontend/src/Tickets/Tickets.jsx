import { useLocation } from 'react-router-dom';
import TicketView from '../components/TicketView';
import '../Tickets/Tickets.css'


function Tickets() {
    const location = useLocation();
    const ticketView = location.state?.ticketView || null;

    return (
        <div className="flex items-center justify-center h-screen">
            {ticketView && (
                <TicketView
                item={ticketView}
                onBack={() => {}}
                />
            )}
        </div>
    );
}


export default Tickets;
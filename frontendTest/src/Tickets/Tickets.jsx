import { useLocation } from 'react-router-dom';
import TicketView from '../components/TicketView';
import '../Tickets/Tickets.css'


function Tickets() {
    const location = useLocation();
    const ticketView = location.state?.ticketView || null;
    // console.log(ticketView)
    return (
        <div>
            <div>
            </div>
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
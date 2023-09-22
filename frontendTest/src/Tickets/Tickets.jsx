import { useLocation } from 'react-router-dom';
import TicketView from '../components/TicketView';


function Tickets() {
    const location = useLocation();
    const ticketView = location.state?.ticketView || null;

    console.log(ticketView)
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
            <div>
                <h2>Tickets Page</h2>
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
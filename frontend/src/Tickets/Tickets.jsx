import { useLocation } from 'react-router-dom';
import TicketView from '../components/TicketView';
import '../Tickets/Tickets.css'
import { GET_TICKETS, GET_CODES} from '../utils/queries'
import { useQuery } from '@apollo/client';



function Tickets() {
    const location = useLocation();
    const ticketView = location.state?.ticketView || null;
    const { loading: ticketsLoading, error: ticketsError, data: ticketsData } = useQuery(GET_TICKETS);
    const { loading: codesLoading, error: codesError, data: codesData } = useQuery(GET_CODES);

    // Define a function to check if the data is available and error-free
    const isDataAvailable = () => !ticketsLoading && !ticketsError && !codesLoading && !codesError && ticketsData && codesData;

    return (
        <div className="flex items-center justify-center h-screen">
            {ticketView && isDataAvailable() && (
                <TicketView
                item={ticketView}
                ticketsData={ticketsData.ticket}
                codesData={codesData.codes}
                onBack={() => {}}
                />
            )}
        </div>
    );
}


export default Tickets;
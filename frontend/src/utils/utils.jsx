// Calculate the delay time between advertised and estimated times for an item
export function outputDelay(AdvertisedTimeAtLocation, EstimatedTimeAtLocation) {
    const advertised = new Date(AdvertisedTimeAtLocation);
    const estimated = new Date(EstimatedTimeAtLocation);
    const diff = Math.abs(estimated - advertised);
    return `${Math.floor(diff / (1000 * 60))} minuter`;
}

// Determine if the application is running in a production environment
const isProduction = process.env.NODE_ENV === 'production';

// Define the API URL based on the environment (production or development)
export const API_URL = isProduction
    ? 'https://jsramverk-editor-pasi21.azurewebsites.net'
    : 'http://localhost:1337';

// Define the URL route based on the environment (production or development)
export const URL_ROUTE = isProduction
    ? '/~pasi21/editor/'
    : '';
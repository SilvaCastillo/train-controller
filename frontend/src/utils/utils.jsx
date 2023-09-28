export function outputDelay(item) {
    const advertised = new Date(item.AdvertisedTimeAtLocation);
    const estimated = new Date(item.EstimatedTimeAtLocation);
    const diff = Math.abs(estimated - advertised);
    return `${Math.floor(diff / (1000 * 60))} minuter`;
}
const fetch = require('node-fetch');

const codes = {
    // Function to get reason codes from the API
    // Output: An array of reason code objects
    getCodes: async function getCodes() {
        const query = `<REQUEST>
                  <LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
                  <QUERY objecttype="ReasonCode" schemaversion="1">
                        <INCLUDE>Code</INCLUDE>
                        <INCLUDE>Level1Description</INCLUDE>
                        <INCLUDE>Level2Description</INCLUDE>
                        <INCLUDE>Level3Description</INCLUDE>
                  </QUERY>
            </REQUEST>`;

        try {
            const response = await fetch(
                "https://api.trafikinfo.trafikverket.se/v2/data.json", {
                    method: "POST",
                    body: query,
                    headers: { "Content-Type": "text/xml" }
                }
            );

            if (response.ok) {
                const result = await response.json();
                return result.RESPONSE.RESULT[0].ReasonCode;
            } else {
                // Handle non-OK response, e.g., return an error response
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            // Handle other errors, e.g., network errors
            console.error(error);
            return { error: "Failed to fetch data" };
        }
    }
};

module.exports = codes;

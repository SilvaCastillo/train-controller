# train-controller
During the security audit using npm audit, several vulnerabilities were identified in our project dependencies, including a critical issue with node-fetch that posed a risk of exposing sensitive information to unauthorized actors. We promptly addressed these vulnerabilities by executing npm audit fix. This swift action not only resolved the security concerns but also saved us valuable time, ensuring the overall robustness and reliability of our project.

To get the application up and running, we followed these essential steps:

    Environment File Setup: We created an .env file to securely store the API key obtained from https://api.trafikinfo.trafikverket.se/API.

    Dependency Management: We installed the dotenv package to seamlessly access and utilize the API key within our trains.js file.

    Backend Setup: To run the backend application, we employed nodemon for easy development and testing.

    Frontend Configuration: For the frontend, we utilized Python 3 with the command python3 -m http.server 9000. This allowed us to view and interact with the application in a web browser.

By following these steps, we successfully configured and launched our application, ensuring smooth functionality and seamless user experience.

# Val av Ramverk
React har ett rykte om att vara både användarvänligt och lätt att lära sig, samtidigt som det erbjuder en imponerande kraft och djup för dem som fördjupar sig i det. Det är verkligen ett klokt val av ramverk att utforska inom ramen för den här kursen. Många av de webbplatser och applikationer vi är bekanta med använder sig av React, vilket också gör det ännu mer lockande. Ta till exempel Discord, som vi aktivt använder för kommunikation i kursen.

En av de fördelar som React erbjuder är att det är enkelt att bygga vidare på när projektet växer i omfång. Dess modulära struktur möjliggör skapandet av små komponenter som sedan kan sammanfogas till en sammanhängande helhet. Detta blir särskilt användbart när vi arbetar i grupp, eftersom det gör det enkelt att lägga till nya funktioner och expandera projektet utan att stöta på alltför många konflikter.

React's virtual DOM ska också vara en kraftfull och användarvänlig funktion som har lovord runtom i webbvärlden. Dess förmåga att effektivt hantera ändringar och uppdateringar på webbsidan är en av dess mest framträdande fördelar som vi ser fram emot att utforska.

Det är också värt att notera att React är det ledande ramverket för front end utveckling, med över 7 miljoner webbplatser som använder det. Den stora efterfrågan på kompetens inom React avspeglas även i de många jobb som är tillgängliga. Att kunna inkludera React på sin meritlista kan definitivt öppna upp dörrar till framtida karriärmöjligheter.
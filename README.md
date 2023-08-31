# train-controller
Under säkerhetsgranskningen med npm audit identifierades flera sårbarheter i våra projektberoenden, inklusive ett kritiskt problem med node-fetch som innebar en risk att känslig information kunde läcka till obehöriga användare. Vi åtgärdade snabbt dessa sårbarheter genom att köra npm audit fix. Denna snabba åtgärd löste inte bara säkerhetsproblemen utan sparade också värdefull tid, vilket säkerställde projektets övergripande robusthet och pålitlighet.

För att få applikationen att fungera följde vi dessa viktiga steg:

    Konfigurering av miljöfil: Vi skapade en .env-fil för att säkert lagra API-nyckeln som erhölls från https://api.trafikinfo.trafikverket.se/API.

    Hantering av beroenden: Vi installerade paketet dotenv för att smidigt få tillgång till och använda API-nyckeln inom vår trains.js-fil.

    Konfigurering av backend: För att köra backend-applikationen använde vi nodemon för enkel utveckling och testning.

    Konfigurering av frontend: För frontend använde vi Python 3 med kommandot python3 -m http.server 9000. Detta gjorde det möjligt för oss att visa och interagera med applikationen i en webbläsare.

Genom att följa dessa steg konfigurerade och startade vi framgångsrikt vår applikation, vilket säkerställde smidig funktionalitet och enkel användarupplevelse.

# Val av Ramverk
React har ett rykte om att vara både användarvänligt och lätt att lära sig, samtidigt som det erbjuder en imponerande kraft och djup för dem som fördjupar sig i det. Det är verkligen ett klokt val av ramverk att utforska inom ramen för den här kursen. Många av de webbplatser och applikationer vi är bekanta med använder sig av React, vilket också gör det ännu mer lockande. Ta till exempel Discord, som vi aktivt använder för kommunikation i kursen.

En av de fördelar som React erbjuder är att det är enkelt att bygga vidare på när projektet växer i omfång. Dess modulära struktur möjliggör skapandet av små komponenter som sedan kan sammanfogas till en sammanhängande helhet. Detta blir särskilt användbart när vi arbetar i grupp, eftersom det gör det enkelt att lägga till nya funktioner och expandera projektet utan att stöta på alltför många konflikter.

React's virtual DOM ska också vara en kraftfull och användarvänlig funktion som har lovord runtom i webbvärlden. Dess förmåga att effektivt hantera ändringar och uppdateringar på webbsidan är en av dess mest framträdande fördelar som vi ser fram emot att utforska.

Det är också värt att notera att React är det ledande ramverket för front end utveckling, med över 7 miljoner webbplatser som använder det. Den stora efterfrågan på kompetens inom React avspeglas även i de många jobb som är tillgängliga. Att kunna inkludera React på sin meritlista kan definitivt öppna upp dörrar till framtida karriärmöjligheter.
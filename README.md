# train-controller
During the security audit using npm audit, several vulnerabilities were identified in our project dependencies, including a critical issue with node-fetch that posed a risk of exposing sensitive information to unauthorized actors. We promptly addressed these vulnerabilities by executing npm audit fix. This swift action not only resolved the security concerns but also saved us valuable time, ensuring the overall robustness and reliability of our project.

To get the application up and running, we followed these essential steps:

    Environment File Setup: We created an .env file to securely store the API key obtained from https://api.trafikinfo.trafikverket.se/API.

    Dependency Management: We installed the dotenv package to seamlessly access and utilize the API key within our trains.js file.

    Backend Setup: To run the backend application, we employed nodemon for easy development and testing.

    Frontend Configuration: For the frontend, we utilized Python 3 with the command python3 -m http.server 9000. This allowed us to view and interact with the application in a web browser.

By following these steps, we successfully configured and launched our application, ensuring smooth functionality and seamless user experience.
// renderUtils.js
export function renderDelayedTable(data) {
    data.forEach((item) => {
        let element = document.createElement("div");

        element.innerHTML = `
            <div class="train-number">
                ${item.OperationalTrainNumber}
            </div>
            <div class="current-station">
                <div>${item.LocationSignature}</div>
                <div>${item.FromLocation ? item.FromLocation[0].LocationName + " -> " : ""} ${item.ToLocation ? item.ToLocation[0].LocationName : ""}</div>
            </div>
            <div class="delay">
                ${outputDelay(item)}
            </div>`;

        element.addEventListener("click", function() {
            renderTicketView(item);
        });

        // table.appendChild(element);
    });
  }
  
  export function renderTicketView(item) {
    let container = document.getElementById("container");
    let newTicketId = 0;

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    var locationString = "";
    if (item.FromLocation) {
         locationString = `<h3>Tåg från ${item.FromLocation[0].LocationName} till ${item.ToLocation[0].LocationName}. Just nu i ${item.LocationSignature}.</h3>`;
    }

    container.innerHTML = `<div class="ticket-container">
            <div class="ticket">
                <a href="" id="back"><- Tillbaka</a>
                <h1>Nytt ärende #<span id="new-ticket-id"></span></h1>
                ${locationString}
                <p><strong>Försenad:</strong> ${outputDelay(item)}</p>
                <form id="new-ticket-form">
                    <label>Orsakskod</label><br>
                    <select id="reason-code"></select><br><br>
                    <input type="submit" value="Skapa nytt ärende" />
                </form>
            </div>
            <br>
            <div class="old-tickets" id="old-tickets">
                <h2>Befintliga ärenden</h2>
            </div>
        </div>`;


    let backButton = document.getElementById("back");
    let reasonCodeSelect = document.getElementById("reason-code");
    let newTicketForm = document.getElementById("new-ticket-form");
    let oldTickets = document.getElementById("old-tickets");

    backButton.addEventListener("click", function(event) {
        event.preventDefault();

        // renderMainView();
    });

    newTicketForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var newTicket = {
            code: reasonCodeSelect.value,
            trainnumber: item.OperationalTrainNumber,
            traindate: item.EstimatedTimeAtLocation.substring(0, 10),
        };

        fetch("http://localhost:1337/tickets", {
            body: JSON.stringify(newTicket),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
        })
            .then((response) => response.json())
            .then((result) => {
                renderTicketView(item);
            });
    });

    fetch("http://localhost:1337/tickets")
        .then((response) => response.json())
        .then((result) => {
            var lastId = result.data[1] ? result.data[1].id : 0;

            newTicketId = lastId + 1;

            let newTicketIdSpan = document.getElementById("new-ticket-id");

            newTicketIdSpan.textContent = newTicketId;

            result.data.forEach((ticket) => {
                let element = document.createElement("div");

                element.innerHTML = `${ticket.id} - ${ticket.code} - ${ticket.trainnumber} - ${ticket.traindate}`;

                oldTickets.appendChild(element);
            });
        });



    fetch("http://localhost:1337/codes")
        .then((response) => response.json())
        .then((result) => {
            result.data.forEach((code) => {
                let element = document.createElement("option");

                element.textContent = `${code.Code} - ${code.Level3Description}`;
                element.value = code.Code;

                reasonCodeSelect.appendChild(element);
            });
        });


  }
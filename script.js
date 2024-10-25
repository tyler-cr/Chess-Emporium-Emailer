import * as emailClasses from "./classes.js";

function handleSelection() {
    const selectedText = document.getElementById("options").value;
    document.getElementById("output").innerHTML = ""; // Clear previous output
    
    let title;
    switch (selectedText) {
        case "Liaison Shift":
            title = "Liaison Shift";
            break;
        case "Camp Shift":
            title = "Camp Shift";
            break;
        case "PCC Coach":
            title = "PCC Coach";
            break;
        case "Assessment Coach":
            title = "Assessment Coach";
            break;
        case "SEP Sub":
            title = "SEP Sub";
            break;
        case "SEP Takeover":
            title = "SEP Takeover";
            break;
        default:
            title = "";
    }

    if (title) {
        generateInput(title);
        // const container = document.createElement("div");
        // const heading = document.createElement("h3");
        // heading.innerText = title;
        // container.appendChild(heading);

        // for (let i = 0; i < 4; i++) {
        //     const inputBox = document.createElement("input");
        //     inputBox.type = "text";
        //     inputBox.placeholder = `Textbox ${i + 1}`;
        //     container.appendChild(inputBox);
        //     container.appendChild(document.createElement("br")); // Line break for layout
        // }

        // document.getElementById("output").appendChild(container);
    }
}

function generateInput(title) {
    const container = document.createElement("div");
    const heading = document.createElement("h3");
    heading.innerText = title;
    container.appendChild(heading);

    // Create an array to hold references to input boxes
    let inputBoxes = [];

    for (let i = 0; i < generateHelper[title].length; i++) {
        const inputBox = document.createElement("input");
        inputBox.type = "text";
        inputBox.placeholder = generateHelper[title][i];
        container.appendChild(inputBox);
        container.appendChild(document.createElement("br")); // Line break for layout

        // Store references to each input box
        inputBoxes.push(inputBox);
    }

    // Add a button at the end
    const button = document.createElement("button");
    button.innerText = "Submit";
    container.appendChild(button);

    // Append the container to the output
    document.getElementById("output").appendChild(container);

    // Add event listener to the button
    button.addEventListener("click", function() {
        // Check if a large textbox already exists
        let largeTextbox = document.getElementById("largeTextbox");

        if (!largeTextbox) {
            // Create the large textarea if it doesn't exist
            largeTextbox = document.createElement("textarea");
            largeTextbox.id = "largeTextbox";
            largeTextbox.rows = 10;
            largeTextbox.cols = 50;
            document.getElementById("output").appendChild(largeTextbox);
        }

        // Fill the textarea with the input from the text boxes
        let collectedText = "";
        inputBoxes.forEach(input => {
            collectedText += input.placeholder + ": " + input.value + "\n";
        });

        // Update the existing textarea content
        largeTextbox.value = collectedText;
    });
}

//TODO: make all the class constructor's properties work and stuff.
// Watchout for potential bug with to_String function. uncertain if I have
// to use the aliases for the functions if they're already declared in a
// variable
function handleInput(title){
    let emailer = new emailClasses.Emailer();
    let email = "";
    switch (title){
        case "Liaison Shift":
            emailer = new emailClasses.Liaison() //TODO: see above
            email = emailer.to_String();
            break;
        case "Camp Shift":
            emailer = new emailClasses.Camp() //TODO: see above
            email = emailer.to_String()
            break;
        case "PCC Coach":
            emailer = new emailClasses.PremiumCenterClass() //TODO: see above
            email = emailer.to_String()
            break;
        case "Assessment Coach":
            emailer = new emailClasses.Assessment() //TODO: see above
            email = emailer.to_String()
            break;
        case "SEP Sub":
            emailer = new emailClasses.SEPSub() //TODO: see above
            email = emailer.to_String()
            break;
        case "SEP Takeover":
            emailer = new emailClasses.SEPTakeover() //TODO: see above
            email = emailer.to_String()
            break;
    }
    return email;
}



let generateHelper = {
    "Liaison Shift": ["sender", "receiver", "day", "date", "sheaOrTempe", "startTime", "endTime"],
    "Camp Shift": ["sender", "receiver", "day", "date", "sheaOrTempe", "morningOrEvening", "primSecTer"],
    "PCC Coach": ["sender", "receiver", "day", "date", "sheaOrTempe", "level", "startTime"],
    "Assessment Coach": ["sender", "receiver", "day", "date", "sheaOrTempe", "student", "rating", "priorExp", "startTime"],
    "SEP Sub": ["sender", "receiver", "day", "date", "schoolName", "schoolAddress", "primaryOrAssist", "start", "finish", "getThere"],
    "SEP Takeover": ["sender", "receiver", "day", "date", "schoolName", "schoolAddress", "primaryOrAssist", "start", "finish", "getThere"]
}
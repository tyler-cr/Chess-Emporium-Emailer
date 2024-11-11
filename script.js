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
    }
}

const dropdownOptions = {
    sheaOrTempe: ["Shea", "Tempe"],
    morningOrEvening: ["Morning", "Evening"],
    primaryOrAssist: ["Primary", "Assistant"],
    level: ["Pawn", "Knight", "Bishop", "Rook", "Queen"]
};

function generateInput(title) {
    const container = document.createElement("div");
    const heading = document.createElement("h3");
    heading.innerText = title;
    container.appendChild(heading);

    let inputBoxes = [];

    generateHelper[title].forEach(field => {
        let element;

        if (dropdownOptions[field]) {
            // Create a dropdown if options are defined for the field
            element = document.createElement("select");
            dropdownOptions[field].forEach(optionValue => {
                const option = document.createElement("option");
                option.value = optionValue;
                option.innerText = optionValue;
                element.appendChild(option);
            });
        } else {
            // Default to a text input if no options are defined
            element = document.createElement("input");
            element.type = "text";
            element.placeholder = field;
        }

        container.appendChild(element);
        container.appendChild(document.createElement("br")); // Line break for layout
        inputBoxes.push(element);
    });

    const button = document.createElement("button");
    button.innerText = "Submit";
    container.appendChild(button);

    document.getElementById("output").appendChild(container);

    button.addEventListener("click", function() {
        handleInput(title, inputBoxes);
    });
}


function handleInput(title, inputBoxes) {
    let emailer;
    let email = "";

    // Collect input values from inputBoxes
    let inputs = inputBoxes.map(inputBox => inputBox.value);

    switch (title) {
        case "Liaison Shift":
            emailer = new Liaison(
                inputs[0], // sender
                inputs[1], // receiver
                inputs[2], // day
                inputs[3], // date
                inputs[4], // sheaOrTempe
                inputs[5], // startTime
                inputs[6]  // endTime
            );
            email = emailer.to_String();
            break;
        case "Camp Shift":
            emailer = new Camp(
                inputs[0], // sender
                inputs[1], // receiver
                inputs[2], // day
                inputs[3], // date
                inputs[4], // sheaOrTempe
                inputs[5], // morningOrEvening
                inputs[6]  // primSecTer
            );
            email = emailer.to_String();
            break;
        case "PCC Coach":
            emailer = new PremiumCenterClass(
                inputs[0], // sender
                inputs[1], // receiver
                inputs[2], // day
                inputs[3], // date
                inputs[4], // sheaOrTempe
                inputs[5], // level
                inputs[6]  // startTime
            );
            email = emailer.to_String();
            break;
        case "Assessment Coach":
            emailer = new Assessment(
                inputs[0], // sender
                inputs[1], // receiver
                inputs[2], // day
                inputs[3], // date
                inputs[4], // sheaOrTempe
                inputs[5], // student
                inputs[6], // rating
                inputs[7], // priorExp
                inputs[8]  // startTime
            );
            email = emailer.to_String();
            break;
        case "SEP Sub":
            emailer = new SEPSub(
                inputs[0], // sender
                inputs[1], // receiver
                inputs[2], // day
                inputs[3], // date
                inputs[4], // schoolName
                inputs[5], // schoolAddress
                inputs[6], // primaryOrAssist
                inputs[7], // start
                inputs[8], // finish
                inputs[9], // getThere
                inputs[10],// lessonWeek
            );
            email = emailer.to_String();
            break;
        case "SEP Takeover":
            emailer = new SEPTakeover(
                inputs[0], // sender
                inputs[1], // receiver
                inputs[2], // day
                inputs[3], // date
                inputs[4], // schoolName
                inputs[5], // schoolAddress
                inputs[6], // primaryOrAssist
                inputs[7], // start
                inputs[8], // finish
                inputs[9]  // getThere
            );
            email = emailer.to_String();
            break;
    }

    // Fill or create the large textbox with the email content
    let largeTextbox = document.getElementById("largeTextbox");

    if (!largeTextbox) {
        // Create the large textarea if it doesn't exist
        largeTextbox = document.createElement("textarea");
        largeTextbox.id = "largeTextbox";
        largeTextbox.rows = 10;
        largeTextbox.cols = 50;
        document.getElementById("output").appendChild(largeTextbox);
    }

    // Update the textarea content with the generated email
    largeTextbox.value = email;

    // Now add the action buttons only after the email is generated
    addActionButtons();
}

function addActionButtons() {
    // Check if the buttons already exist
    if (document.getElementById("copyButton") || document.getElementById("resetButton")) {
        return; // Exit if buttons already exist
    }

    const container = document.createElement("div");

    // Create "Copy to Clipboard" button
    const copyButton = document.createElement("button");
    copyButton.id = "copyButton";
    copyButton.innerText = "Copy to Clipboard";
    container.appendChild(copyButton);

    // Add event listener to the copy button
    copyButton.addEventListener("click", function() {
        const largeTextbox = document.getElementById("largeTextbox");
        if (largeTextbox) {
            largeTextbox.select();
            document.execCommand("copy");
            alert("Copied to clipboard!");
        } else {
            alert("No email content to copy.");
        }
    });

    // Create "Reset" button
    const resetButton = document.createElement("button");
    resetButton.id = "resetButton";
    resetButton.innerText = "Reset";
    container.appendChild(resetButton);

    // Add event listener to the reset button
    resetButton.addEventListener("click", function() {
        document.getElementById("output").innerHTML = ""; // Clear all content
        document.getElementById("options").value = "";    // Reset the dropdown
    });

    // Append the action buttons to the output
    document.getElementById("output").appendChild(container);
}


let generateHelper = {
    "Liaison Shift": ["sender", "receiver", "day", "date", "sheaOrTempe", "startTime", "endTime"],
    "Camp Shift": ["sender", "receiver", "day", "date", "sheaOrTempe", "morningOrEvening", "primSecTer"],
    "PCC Coach": ["sender", "receiver", "day", "date", "sheaOrTempe", "level", "startTime"],
    "Assessment Coach": ["sender", "receiver", "day", "date", "sheaOrTempe", "student", "rating", "priorExp", "startTime"],
    "SEP Sub": ["sender", "receiver", "day", "date", "schoolName", "schoolAddress", "primaryOrAssist", "start", "finish", "getThere", "lessonWeek"],
    "SEP Takeover": ["sender", "receiver", "day", "date", "schoolName", "schoolAddress", "primaryOrAssist", "start", "finish", "getThere"]
};




class Emailer {
    sender = "";
    receiver = "";
    day  = "";
    date = "";

    constructor(sender, receiver, day, date){
        this.sender = sender;
        this.receiver = receiver;
        this.day = day;
        this.date = date;
    }
}

 class Center extends Emailer{
    sheaOrTempe = "shea";

    constructor(sender, receiver, day, date, sheaOrTempe){
        super(sender, receiver, day, date);
        this.sheaOrTempe = sheaOrTempe;
    }
}

 class Liaison extends Center {
    startTime = "";
    endTime = "";
    constructor(sender, receiver, day, date, sheaOrTempe, startTime, endTime) {
        super(sender, receiver, day, date, sheaOrTempe);
        this.startTime = startTime;
        this.endTime = endTime;
    }

    to_String() {
        let email = "";

        email += "Hello " + this.receiver + ",\n\n";
        email += "This email is to confirm you are good \
to be the substitute liaison at the " + this.sheaOrTempe + " location on " + this.day + ", " + this.date + " from \
" + this.startTime + " to " + this.endTime + ".";
        email += "\n\nHere's the assignment info:\n";
        email += "Location: " + this.sheaOrTempe + "\n";
        email += "Date and Time of Assignment: " + this.date + ", " + this.startTime + " - " + this.endTime + ".\n\n";
        email += "Please email back and confirm that this assignment works for you. \n\n";
        email += "Sincerely,\n" + this.sender + ", Chess Emporium Liaison";

        return email;
    }
}

 class Camp extends Center{ 

    morningOrEvening = "morning";
    primSecTer = PST.primary;

    constructor(sender, receiver, day, date, sheaOrTempe, morningOrEvening, primSecTer){
        super(sender, receiver, day, date, sheaOrTempe);
        this.morningOrEvening = morningOrEvening;
        this.primSecTer = primSecTer;

        if (morningOrEvening.toLowerCase() == "morning"){
            this.startTime = "8:00 AM";
            this.endTime = "12:30 PM";
            this.getThere = "7:45 AM";
        }
        else{
            this.startTime = "12:00 AM";
            this.endTime = "4:30 PM";
            this.getThere = "11:45 AM";
        }

    }

    to_String(){
        let email = '';

        email += "Hello " + this.receiver + ",\n\n";
        email += "This email is to confirm you are good to be the " + this.morningOrEvening + " camp coach at the " + this.sheaOrTempe+ " location on " + this.date + " from "+this.startTime+" to "+this.endTime+" (arrive by "+this.getThere+").";
        email += "\n\nHere's the camp info:\n";
        email += "Location: " + this.sheaOrTempe + "\n";
        email += "Date and Time of Assignment: " + this.date + ", "+this.startTime+" to "+this.endTime+" (arrive by "+this.getThere+"\n\n";
        email += "Please email back and confirm that this assignment works for you. \n\n";
        email += "Sincerely,\n"+this.sender+", Chess Emporium Liaison";

        return email;
    }
}

 class PremiumCenterClass extends Center{
    level = PCC.pawn;
    startTime = "";

    constructor(sender, receiver, day, date, sheaOrTempe, level, startTime){
        super(sender, receiver, day, date, sheaOrTempe);
        this.level = level;
        this.startTime = startTime;
        this.endTime = addOneHour(this.startTime);
    }

    to_String(){

        let email = "";

        email += "Hello " + this.receiver + ",\n\n";
        email += "This email is to confirm you are good \
to be the substitute coach for the "+this.level+" class at the " + this.sheaOrTempe + " location on " + this.day + ", " + this.date + " from \
" + this.startTime + " to " + this.endTime + ".";
        email += "\n\nHere's the assignment info:\n";
        email += "Location: " + this.sheaOrTempe + "\n";
        email += "Date and Time of Assignment: " + this.date + ", " + this.startTime + " - " + this.endTime + ".\n\n";
        email += "Please email back and confirm that this assignment works for you. \n\n";
        email += "Sincerely,\n" + this.sender + ", Chess Emporium Liaison";

        return email;
    }
}

 class Assessment extends Center{
    student = "";
    rating = "";
    priorExp = "";
    startTime = "";

    constructor(sender, receiver, day, date, sheaOrTempe, student, rating, priorExp, startTime){
        super(sender, receiver, day, date, sheaOrTempe);
        this.student = student;
        this.rating = rating;
        this.priorExp = priorExp;
        this.startTime = startTime;
        this.endTime = addOneHour(this.startTime);
    }

    to_String(){

        let email = "";

        email += "Hello " + this.receiver + ",\n\n";
        email += "This email is to confirm you are good \
to be the assessor for an assessment at the " + this.sheaOrTempe + " location on " + this.day + ", " + this.date + " from \
" + this.startTime + " to " + this.endTime + ".";
        email += "\n\nHere's the assignment info:\n";
        email += "Location: " + this.sheaOrTempe + "\n";
        email += "Date and Time of Assignment: " + this.date + ", " + this.startTime + " - " + this.endTime + ".\n";
        email += "Student name: "+this.student+"\n";
        email += "Student rating: "+this.rating+"\n";
        email += "Student experiance: "+this.priorExp+"\n\n"; 
        email += "Please email back and confirm that this assignment works for you. \n\n";
        email += "Sincerely,\n" + this.sender + ", Chess Emporium Liaison";

        return email;
    }

}

 class SEP extends Emailer{
    schoolName = "";
    schoolAddress = "";
    primaryOrAssist = "Primary";
    start = "";
    finish = "";
    getThere = "";

    constructor(sender, receiver, day, date, schoolName, schoolAddress, primaryOrAssist, start, finish, getThere){
        super(sender, receiver, day, date);
        this.schoolName = schoolName;
        this.schoolAddress = schoolAddress;
        this.primaryOrAssist = primaryOrAssist;
        this.start = start;
        this.finish = finish;
        this.getThere = getThere;
    }
}

 class SEPTakeover extends SEP{
    constructor(sender, receiver, day, date, schoolName, schoolAddress, primaryOrAssist, start, finish, getThere){
        super(sender, receiver, day, date, schoolName, schoolAddress, primaryOrAssist, start, finish, getThere);
    }

    to_String(){
        let email = "";
        email += "Hello " + this.receiver + ",\n\n" +
        "This email is to confirm you are good to take over as the "+this.primaryOrAssist+" coach at " + this.schoolName + " starting on " + this.date + " from " + this.start + " to " + this.finish + " (arrive by " + this.getThere + ").\n\n" +
        "Here's the school info:\n" +
        "Name: " + this.schoolName + "\n" +
        "Address: " + this.schoolAddress + "\n" +
        "Starting Date and Time of Assignment: " + this.date + ", " + this.start + " - " + this.finish + " (arrive by " + this.getThere + ").\n\n" +
        "Please email back and confirm that this assignment works for you.\n\n" +
        "Sincerely,\n" +
        this.sender + ", Chess Emporium Liaison";

        return email;
    }
}

 class SEPSub extends SEP{
    constructor(sender, receiver, day, date, schoolName, schoolAddress, primaryOrAssist, start, finish, getThere, lessonWeek){
        super(sender, receiver, day, date, schoolName, schoolAddress, primaryOrAssist, start, finish, getThere);
        this.lessonWeek = lessonWeek;
        this.lesson = LESSONWEEK[this.lessonWeek];
    }

    to_String() {
        let email = "";
        email += "Hello " + this.receiver + ",\n\n";
        email += "This email is to confirm you are good to substitute as the "+this.primaryOrAssist+" coach at " + this.schoolName + " on " + this.date + " from " + this.start + " to " + this.finish + " (arrive by " + this.getThere + ").\n\n";
        email += "Here's the school info:\n";
        email += "Name: " + this.schoolName + "\n";
        email += "Address: " + this.schoolAddress + "\n";
        email += "Date and Time of Assignment: " + this.date + ", " + this.start + " - " + this.finish + " (arrive by " + this.getThere + ").\n";
        email += "Class #"+this.lessonWeek+": "+this.lesson+"\n\n";
        email += "Attached is a roster for reference. As well, you should be able to acces it on the 'My Rosters' section of Chess Emporium website.\n\n";
        email += "Please email back and confirm that this assignment works for you.\n\n";
        email += "Sincerely,\n"+this.sender+", Chess Emporium Liaison";
    
        return email;
    }
    
}

function addOneHour(time) {
    let [hours, minutes] = time.split(":").map(part => part.trim());
    let period = minutes.slice(-2);
    minutes = minutes.slice(0, -2).trim();

    hours = parseInt(hours);
    if (period === "AM" && hours === 11) {
        period = "PM";
    } else if (period === "PM" && hours === 11) {
        period = "AM";
    }

    hours = (hours % 12) + 1;

    return `${hours}:${minutes} ${period}`;
}



 const PST = {
    PRIMARY:    "Primary",
    SECONDARY:  "Secondary",
    TERTIARY:   "Tertiary"
}

 const PCC = {
    PAWN:       "Pawn",
    KNIGHT:     "Knight",
    BISHOP:     "Bishop",
    ROOK:       "Rook",
    QUEEN:      "Queen"
}

 const LESSONWEEK = {
    "1":        "Piece Movement, Name, and Value",
    "2":        "Check, Checkmate, and Touch Move",
    "3":        "Pawn Promotion and Notation",
    "4":        "General Opening Theory",
    "5":        "Queen, Rook and King Mate",
    "6":        "Active Moves",
    "7":        "Pins",
    "8":        "Forks",
    "9":        "Discovery",
    "10":       "King and Queen Mate",
    "11":       "Trade",
    "12":       "Threat",
    "13":       "Remove the Defender",
    "14":       "Back-Rank Mate",
    "15":       "Decoy",
    "16":       "Overload",

 }
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
    }

    to_String(){

        //TODO: Implement startTime, endtime, getThere being done automatically based off of morningOrEvening value.. for now they're just 9, 9, and 8:45, respectively

        let email = '';

        email += "Hello " + this.receiver + ",\n";
        email += "This email is to confirm you are good to be the " + this.morningOrEvening + " camp coach at" + this.sheaOrTempe+ " camp on " + this.date + " from 9 to 9 (arrive by 8:45).";
        email += "\n\nHere's the camp info:\n";
        email += "Location: " + this.sheaOrTempe + "\n";
        email += "Date and Time of Assignment: " + this.date + ", 9 - 9 (arrive by 8:45).\n\n";
        email += "Please email back and confirm that this assignment works for you. \n\n";
        email += "Sincerely,\n"+this.sender+"Chess Emporium Liaison";

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
    }

    to_String(){

        //TODO: Implement endTime being done automatically based off of startTime... for now is just undefined

        let email = "";

        email += "Hello " + this.receiver + ",\n\n";
        email += "This email is to confirm you are good \
to be the substitute coach for the "+this.level+" class at" + this.sheaOrTempe + " location on " + this.day + ", " + this.date + " from \
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
    }

    to_String(){
        //TODO: Implement endTime being done automatically based off of startTime... for now is just undefined

        let email = "";

        email += "Hello " + this.receiver + ",\n\n";
        email += "This email is to confirm you are good \
to be the assessor for an assessment at" + this.sheaOrTempe + " location on " + this.day + ", " + this.date + " from \
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

    // TODO: write to_String() function
    to_String(){
        let email = "";
        email += "Hello " + this.receiver + ",\n" +
        "This email is to confirm you are good to take over as the coach at " + this.schoolName + " starting on " + this.date + " from " + this.start + " to " + this.finish + " (arrive by " + this.getThere + ").\n\n" +
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
    constructor(sender, receiver, day, date, schoolName, schoolAddress, primaryOrAssist, start, finish, getThere){
        super(sender, receiver, day, date, schoolName, schoolAddress, primaryOrAssist, start, finish, getThere);
    }

    to_String() {
        let email = "";
        email += "Hello " + this.receiver + ",\n\n";
        email += "This email is to confirm you are good to substitute at " + this.schoolName + " on " + this.date + " from " + this.start + " to " + this.finish + " (arrive by " + this.getThere + ").\n\n";
        email += "Here's the school info:\n";
        email += "Name: " + this.schoolName + "\n";
        email += "Address: " + this.schoolAddress + "\n";
        email += "Date and Time of Assignment: " + this.date + ", " + this.start + " - " + this.finish + " (arrive by " + this.getThere + ").\n\n";
        email += "Attached is a roster for reference.\n\n";
        email += "Please email back and confirm that this assignment works for you.\n\n";
        email += "Sincerely,\nTyler Crimando, Chess Emporium Liaison";
    
        return email;
    }
    
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

function main(){
    let testEmail = new SEPSub("sender", "receiver", "day", "date", "schoolName", "schoolAddress", "primaryOrAssist", "start", "finish", "getThere");
    console.log(testEmail.to_String());
}

main();
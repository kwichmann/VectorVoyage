class Event {
    constructor(typ, retning) {
        // Nulstil instruks
        this.instruks = "";

        if (typ == "start") {
            this.instruks += 'Du starter din rejse i Spanien. ';
            typ = "sejl";
        }
        if (typ == "sejl") {
            this.instruks += 'Dit skib kan sejle 10 felter stik vest i løbet af den næste måned. ';
            this.farve = color(255, 0, 0);
            this.midlertidigFarve = color(200, 0, 0);
        }
        if (typ == "vind") {
            this.instruks += "Vinden blæser! Den bærer dit skib " + retning + '. ';
            this.farve = color(0, 255, 0);
            this.midlertidigFarve = color(0, 200, 0);
        }
        if (typ == "strøm") {
            this.instruks += "Der er kraftige havstrømninger. De bærer dit skib " + retning + ". ";
            this.farve = color(0, 0, 255);
            this.midlertidigFarve = color(0, 0, 200);
        }

        if (typ == "slut") {
            this.instruks += "Din rejse er slut. Hvor er du landet henne? Hvor mange måneder tog rejsen?";
            return
        }

        this.instruks += "Indtegn ruten ved at klikke først på startpunkt og derefter slutpunktet.";
    }

    meddel() {
        select("#instruks").html(this.instruks);
    }
}

function resetRejse(r) {
    rejse = r;
    vektorer = [];
    rejseEvent = 0;
    setEvent();
}

function nyEvent() {
    rejseEvent++;
    setEvent();

    if (rejseEvent == rejse.length - 1) {   
        rejse = null;
        midlertidigFarve = color(0);
        return;
    }   
}

function setEvent() {
    rejse[rejseEvent].meddel();
    farve = rejse[rejseEvent].farve;
    midlertidigFarve = rejse[rejseEvent].midlertidigFarve;
    klik = false;
}

function backtrackEvent() {
    rejseEvent--;
    setEvent();
    vektorer.pop();
}
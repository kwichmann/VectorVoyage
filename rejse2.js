class Event {
    constructor(typ, vektorer, korrekt) {
        
        // Instruks
        if (typ == "vind") {
            this.instruks = 'Både skibets fremdrift og vinden er vist på figuren. Hvad er den samlede kurs?';
        }
        if (typ == "strøm") {
            this.instruks = 'Både skibets fremdrift, vinden og havstrømmen er vist på figuren. Hvad er den samlede kurs?';
        }

        this.vektorer = vektorer;
        this.korrekt = korrekt;
    }

    meddel() {
        select("#instruks").html("Måned " + (rejseEvent + 1) + ". " + this.instruks);
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

    if (rejseEvent == rejse.length) {
        select("#instruks").html("Rejsen er slut.");
        rejse = null;
        midlertidigFarve = color(0);
        return;
    }
    setEvent();
}

function setEvent() {
    rejse[rejseEvent].meddel();
    farve = color(255, 0, 255);
    midlertidigFarve = color(200, 0, 200);
    vektorer = rejse[rejseEvent].vektorer.slice(0);
    klik = false;
    korrekt = null;
}

function backtrackEvent() {
    rejseEvent--;
    setEvent();
    vektorer.pop();
}
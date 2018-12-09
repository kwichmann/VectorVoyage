class Event {
    constructor(typ, vektorer, skalar, korrekt) {
        
        // Instruks
        if (typ == "vind") {
            this.instruks = 'Vinden er vist på figuren. ';
        }
        if (typ == "strøm") {
            this.instruks = 'Havstrømmen er vist på figuren. ';
        }

        if (skalar == 3) {
            this.instruks += " Hvad ville den være hvis den var tre gange så kraftig?"
        }
        if (skalar == 2) {
            this.instruks += " Hvad ville den være hvis den var dobbelt så kraftig?"
        }
        if (skalar == 0.5) {
            this.instruks += " Hvad ville den være hvis den var halvt så kraftig?"
        }
        if (skalar == -0.5) {
            this.instruks += " Hvad ville den være hvis den var halvt så kraftig i den modsatte retning?"
        }
        if (skalar == -1) {
            this.instruks += " Hvad ville den være hvis den var i den modsatte retning?"
        }
        if (skalar == -2) {
            this.instruks += " Hvad ville den være hvis den var dobbelt så kraftig i den modsatte retning?"
        }
        if (skalar == -3) {
            this.instruks += " Hvad ville den være hvis den var tre gange så kraftigi den modsatte retning?"
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
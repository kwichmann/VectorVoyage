// Kort
let atlanten;

// Knapper
let rejseKnap1, rejse2Knap, rejseKnap3, tilbageKnap;

// De tre rejser
let rejse1, rejse2, rejse3;

// Nuværende rejse og event.
let rejse;
let rejseEvent = 0;

// Klikket eller ej? Og klikkede koordinater
let klik = false;
let iNu, jNu;

// Farver
let farve, midlertidigFarve;

// Array af vektorer
let vektorer = [];

function preload() {
    atlanten = loadImage("atlanten.png");
}

function setup() {
    const kanvas = createCanvas(1413, 568);
    select("#kanvas").child(kanvas);

    rejseKnap1 = createButton("Rejse 1");
    rejseKnap2 = createButton("Rejse 2");
    rejseKnap3 = createButton("Rejse 3");
    const knapDiv = select("#knapper");
    knapDiv.child(rejseKnap1);
    knapDiv.child(rejseKnap2);
    knapDiv.child(rejseKnap3);

    tilbageKnap = createButton("Gå et trin tilbage")
    select("#tilbage").child(tilbageKnap);

    // Rejser
    rejse1 = [
        new Event("start", ""),
        new Event("sejl", ""),
        new Event("sejl", ""),
        new Event("sejl", ""),
        new Event("slut", "")
    ];
    
    rejse2 = [
        new Event("start", ""),
        new Event("vind", "2 felter mod syd"),
        new Event("sejl", ""),
        new Event("vind", "4 felter diagonalt mod sydøst"),
        new Event("sejl", ""),
        new Event("vind", "4 felter mod vest"),
        new Event("sejl", ""),
        new Event("slut", "")
    ];
    
    rejse3 = [
        new Event("start", ""),
        new Event("vind", "2 felter mod syd"),
        new Event("strøm", "2 felter mod syd"),
        new Event("sejl", ""),
        new Event("vind", "4 felter diagonalt mod sydøst"),
        new Event("strøm", "4 felter mod vest"),
        new Event("sejl", ""),
        new Event("vind", "4 felter diagonalt mod sydvest"),
        new Event("slut", "")
    ];

    rejseKnap1.mouseClicked(() => resetRejse(rejse1));
    rejseKnap2.mouseClicked(() => resetRejse(rejse2));
    rejseKnap3.mouseClicked(() => resetRejse(rejse3));

    tilbageKnap.mouseClicked(backtrackEvent);

    midlertidigFarve = color(0);
}

function draw() {
    // Tegn kort
    image(atlanten, 0, 0);

    // Tegn prik
    stroke(0);
    const koord = naboPunkt(mouseX, mouseY);
    tegnPunkt(koord[0], koord[1]);

    // Tegn vektorer
    vektorer.forEach((v) => v.tegn());

    // Er der klikket? Tegn da nuværende vektor
    if (klik) {
        const nyV = new Vektor(iNu, jNu, koord[0], koord[1], midlertidigFarve);
        nyV.tegn();
    }

    // Gem tilbage-knap, hvis der ikke er valgt en rejse
    if (rejse && rejseEvent > 0) {
        tilbageKnap.show();
    } else {
        tilbageKnap.hide();
    }
}

function mouseClicked() {
    const koord = naboPunkt(mouseX, mouseY);
    if (koord[1] > 22) {
        return
    }

    if (!klik) {
        iNu = koord[0];
        jNu = koord[1];
        klik = true;   
        return;
    }

    if (!rejse) {
        klik = false;
        return;
    }

    vektorer.push(new Vektor(iNu, jNu, koord[0], koord[1], farve));
    klik = false;
    nyEvent();
}

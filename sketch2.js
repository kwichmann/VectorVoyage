// Kort og sand/falsk
let atlanten;
let sandFalsk;

// Knapper
let rejse2Knap, rejseKnap3, tilbageKnap;

// De to relevante rejser
let rejse2, rejse3;

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

// Er der svaret korrekt?
let korrekt;

function preload() {
    atlanten = loadImage("atlanten.png");
    sandFalsk = loadImage("true_false.png");
}

function setup() {
    const kanvas = createCanvas(1413, 568);
    select("#kanvas").child(kanvas);

    rejseKnap2 = createButton("Rejse 2");
    rejseKnap3 = createButton("Rejse 3");
    const knapDiv = select("#knapper");
    knapDiv.child(rejseKnap2);
    knapDiv.child(rejseKnap3);

    tilbageKnap = createButton("Gå et trin tilbage")
    select("#tilbage").child(tilbageKnap);

    // Rejser
    rejse2 = [
        new Event("vind", [
            new Vektor(40, 9, 30, 9, color(255, 0, 0)),
            new Vektor(30, 9, 30, 11, color(0, 255, 0))
        ], [-10, 2]),
        new Event("vind", [
            new Vektor(30, 11, 20, 11, color(255, 0, 0)),
            new Vektor(20, 11, 24, 15, color(0, 255, 0))
        ], [-6, 4]),
        new Event("vind", [
            new Vektor(24, 15, 14, 15, color(255, 0, 0)),
            new Vektor(14, 15, 12, 15, color(0, 255, 0))
        ], [-12, 0])
    ];
    
    rejse3 = [
        new Event("strøm", [
            new Vektor(40, 9, 30, 9, color(255, 0, 0)),
            new Vektor(30, 9, 30, 11, color(0, 255, 0)),
            new Vektor(30, 11, 30, 13, color(0, 0, 255))
        ], [-10, 4]),
        new Event("strøm", [
            new Vektor(30, 13, 20, 13, color(255, 0, 0)),
            new Vektor(20, 13, 24, 17, color(0, 255, 0)),
            new Vektor(24, 17, 22, 17, color(0, 0, 255))
        ], [-8, 4]),
        new Event("strøm", [
            new Vektor(22, 17, 12, 17, color(255, 0, 0)),
            new Vektor(12, 17, 8, 17, color(0, 255, 0)),
            new Vektor(8, 17, 5, 20, color(0, 0, 255))
        ], [-17, 3])
    ];
    
    rejseKnap2.mouseClicked(() => resetRejse(rejse2));
    rejseKnap3.mouseClicked(() => resetRejse(rejse3));

    tilbageKnap.mouseClicked(backtrackEvent);

    midlertidigFarve = color(0);
}

function draw() {
    // Tegn kort
    image(atlanten, 0, 0);

    // Tegn korrekt-marker
    if (korrekt == "ja") {
        image(sandFalsk, 20, 20, 150, 150, 0, 0, 153, 153);
    }
    if (korrekt == "nej") {
        image(sandFalsk, 20, 20, 150, 150, 192, 0, 153, 153);
    }

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
    if (koord[1] > 22 || korrekt) {
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

    // Tjek om svaret er korrekt (lidt grimt :-/ )
    if (koord[0] - iNu == rejse[rejseEvent].korrekt[0] && koord[1] - jNu == rejse[rejseEvent].korrekt[1]) {
        korrekt = "ja";
    } else {
        korrekt = "nej";
    }
    setTimeout(nyEvent, 1000);
}

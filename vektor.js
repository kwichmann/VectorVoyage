class Vektor {
    constructor(i1, j1, i2, j2, c) {
        this.i1 = i1;
        this.j1 = j1;
        this.i2 = i2;
        this.j2 = j2;
        this.c = c;
    }

    tegn() {
        // Farve
        fill(this.c);
        stroke(this.c);

        // Koordinater på kanvas
        let x1 = this.i1 * dx;
        let x2 = this.i2 * dx;
        let y1 = this.j1 * dy;
        let y2 = this.j2 * dy;
        
        // Er der tale om nulvektoren?
        if (x1 == x2 && y1 == y2) {
            return;
        }

        // Selve vektoren
        strokeWeight(2);
        line(x1, y1, x2, y2);
        
        // Pilehoved
        push();
            translate(x2, y2);
            rotate(PI - Math.atan2(x2 - x1, y2 - y1));
            triangle(0, 0, dx / 6, dy / 2, -dx / 6, dy / 2);
        pop();
    }
}
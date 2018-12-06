// Gitterafstand (totalt hack ...!)
const dx = 1413/45.1;
const dy = 568/22;

function tegnPunkt(i, j) {
    strokeWeight(8);
    point(i * dx, j * dy);
}

function naboPunkt(x, y) {
    const i = round(x / dx);
    const j = round(y / dy);
    return [i, j];
}


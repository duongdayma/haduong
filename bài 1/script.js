const soHopCon = 8;
const soVienBiToiDa = 4;

function tinhSoCachDatBi() {
    let soCach = 1;
    for (let i = 0; i < soHopCon; i++) {
        soCach *= soVienBiToiDa;
    }
    return soCach;
}

const soCach = tinhSoCachDatBi();
document.getElementById("so-cach").innerHTML = soCach.toString();

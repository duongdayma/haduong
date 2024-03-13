const soMau = 4;
const soQuocGia = 4;
const maTranKe = [
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
];

function hienThiKetQua() {
    // Thực hiện tô màu
    const danhSachMau = new Array(soQuocGia);
    for (let i = 0; i < soQuocGia; i++) {
        danhSachMau[i] = -1;
    }

    let daToMau = 0;
    while (daToMau < soQuocGia) {
        // Tìm quốc gia chưa tô màu
        let i = 0;
        while (danhSachMau[i] != -1) {
            i++;
        }

        // Tìm tập hợp các màu có thể sử dụng
        const tapHopMauCoTheSuDung = new Array(soMau);
        for (let j = 0; j < soMau; j++) {
            tapHopMauCoTheSuDung[j] = true;
        }

        for (let j = 0; j < soQuocGia; j++) {
            if (maTranKe[i][j] == 1 && danhSachMau[j] != -1) {
                tapHopMauCoTheSuDung[danhSachMau[j]] = false;
            }
        }

        // Chọn màu có số lượng quốc gia sử dụng ít nhất
        let mauDuocChon = -1;
        let soLuongSuDungToiThieu = soQuocGia;
        for (let j = 0; j < soMau; j++) {
            if (tapHopMauCoTheSuDung[j]) {
                let soLuongSuDung = 0;
                for (let k = 0; k < soQuocGia; k++) {
                    if (danhSachMau[k] == j) {
                        soLuongSuDung++;
                    }
                }

                if (soLuongSuDung < soLuongSuDungToiThieu) {
                    soLuongSuDungToiThieu = soLuongSuDung;
                    mauDuocChon = j;
                }
            }
        }

        // Tô màu cho quốc gia i
        danhSachMau[i] = mauDuocChon;
        daToMau++;
    }

    // Hiển thị kết quả
    let ketQua = "";
    for (let i = 0; i < soQuocGia; i++) {
        ketQua += `Quốc gia ${i + 1}: Màu ${danhSachMau[i] + 1}\n`;
    }
    document.getElementById("ket-qua").innerHTML = ketQua;
}

hienThiKetQua();

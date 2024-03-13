function lietKe() {
    // Lấy các phần tử của tập
    const tapHop = document.getElementById("tap-hop").value.split(",");

    // Tính số tập hợp con
    const soTapHopCon = Math.pow(2, tapHop.length);

    // Liệt kê các tập hợp con
    let ketQua = "";
    for (let i = 0; i < soTapHopCon; i++) {
        ketQua += "{";
        for (let j = 0; j < tapHop.length; j++) {
            if ((i & (1 << j)) != 0) {
                ketQua += `${tapHop[j]}, `;
            }
        }
        ketQua = ketQua.slice(0, -2);
        ketQua += "}\n";
    }

    // Hiển thị kết quả
    document.getElementById("ket-qua").innerHTML = ketQua;
}

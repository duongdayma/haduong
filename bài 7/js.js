// Biểu diễn đồ thị
const graph = {
    A: {
        B: 5,
        C: 8,
    },
    B: {
        A: 5,
        D: 13,
    },
    C: {
        A: 8,
        D: 7,
    },
    D: {
        B: 13,
        C: 7,
    },
};

// Chạy thuật toán Dijkstra
const dijkstra = (graph, source) => {
    // Khởi tạo
    const distances = {};
    const visited = {};
    for (const vertex of Object.keys(graph)) {
        distances[vertex] = Infinity;
        visited[vertex] = false;
    }
    distances[source] = 0;

    // Lặp lại
    while (true) {
        // Chọn đỉnh có khoảng cách nhỏ nhất chưa được thăm
        let minVertex = null;
        let minDistance = Infinity;
        for (const vertex of Object.keys(distances)) {
            if (!visited[vertex] && distances[vertex] < minDistance) {
                minVertex = vertex;
                minDistance = distances[vertex];
            }
        }

        // Nếu không có đỉnh nào chưa được thăm, kết thúc
        if (minVertex === null) {
            break;
        }

        // Đánh dấu đỉnh đã thăm
        visited[minVertex] = true;

        // Cập nhật lại khoảng cách
        for (const neighbor of Object.keys(graph[minVertex])) {
            const newDistance = distances[minVertex] + graph[minVertex][neighbor];
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
            }
        }
    }

    return distances;
};

// Hiển thị kết quả
const calculate = () => {
    const source = document.getElementById("source").value;
    const result = dijkstra(graph, source);
    for (const vertex of Object.keys(result)) {
        const distance = result[vertex];
        const text = document.createTextNode(`A -> ${vertex}: ${distance}`);
        const listItem = document.createElement("li");
        listItem.appendChild(text);
        document.getElementById("result").appendChild(listItem);
    }
};

// Thêm sự kiện bấm nút
document.getElementById("calculate").addEventListener("click", calculate);

// Hiển thị đồ thị
for (const vertex of Object.keys(graph)) {
    const text = document.createTextNode(`${vertex}`);
    const listItem = document.createElement("li");
    listItem.appendChild(text);
    document.getElementById("graph").appendChild(listItem);

    for (const neighbor of Object.keys(graph[vertex])) {
        const weight = graph[vertex][neighbor];
        const text = document.createTextNode(` -> ${neighbor} (${weight})`);
        const span = document.createElement("span");
        span.appendChild(text);
        listItem.appendChild(span);
    }
}
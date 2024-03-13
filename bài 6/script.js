function findMST() {
    // Lấy số lượng đỉnh
    const numNodes = parseInt(document.getElementById("num-nodes").value);
  
    // Lấy thông tin về các cạnh
    const edgesData = document.getElementById("edges-data").value;
    const edges = edgesData.split("\n").map(line => {
      const parts = line.split(" - ");
      return {
        source: parseInt(parts[0]),
        target: parseInt(parts[1]),
        weight: parseInt(parts[2]),
      };
    });
  
    // Sắp xếp các cạnh theo thứ tự tăng dần của trọng số
    edges.sort((a, b) => a.weight - b.weight);
  
    // Tạo tập hợp các cạnh trong MST
    const mstEdges = [];
  
    // Tạo tập hợp các đỉnh đã được thêm vào MST
    const visitedNodes = new Set();
  
    // Lần lượt xét các cạnh theo thứ tự đã sắp xếp
    for (const edge of edges) {
      // Nếu cạnh không tạo thành chu trình với các cạnh đã được chọn trước đó
      if (!isCyclic(mstEdges, edge, visitedNodes)) {
        // Thêm cạnh vào MST
        mstEdges.push(edge);
  
        // Thêm các đỉnh của cạnh vào tập hợp các đỉnh đã được thêm vào MST
        visitedNodes.add(edge.source);
        visitedNodes.add(edge.target);
      }
  
      // Nếu tất cả các đỉnh đã được thêm vào MST, thì dừng
      if (visitedNodes.size === numNodes) {
        break;
      }
    }
  
    // Hiển thị kết quả
    const result = document.getElementById("result");
    result.innerHTML = "Danh sách các cạnh trong cây khung nhỏ nhất:<br>";
    result.innerHTML += mstEdges.map(edge => `${edge.source} -- ${edge.target} (weight: ${edge.weight})`).join("<br>");
    result.innerHTML += "<br>Tổng trọng số của cây khung nhỏ nhất: " + mstEdges.reduce((acc, edge) => acc + edge.weight, 0);
  }
  
  function isCyclic(edges, edge, visitedNodes) {
    // Tạo tập hợp các đỉnh đã được duyệt
    const visited = new Set();
  
    // Duyệt qua tất cả các cạnh trong MST
    for (const mstEdge of edges) {
      // Nếu hai cạnh có chung một đỉnh
      if (mstEdge.source === edge.source || mstEdge.source === edge.target ||
        mstEdge.target === edge.source || mstEdge.target === edge.target) {
  
        // Duyệt qua các đỉnh liên thông với cạnh mstEdge
        for (const neighbor of [mstEdge.source, mstEdge.target]) {
          // Nếu đỉnh liên thông chưa được duyệt và là đỉnh của cạnh edge
          if (!visited.has(neighbor) && !visitedNodes.has(neighbor) && (neighbor === edge.source || neighbor === edge.target)) {
            return true;
          }
  
          // Đánh dấu đỉnh đã được duyệt
          visited.add(neighbor);
        }
      }
    }
  
    return false;
  }


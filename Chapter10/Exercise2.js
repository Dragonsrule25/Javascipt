const roads = {
    "Alice Springs": { "Darwin": 1530, "Melbourne": 1970 },
    "Darwin": { "Alice Springs": 1530, "Brisbane": 2700 },
    "Melbourne": { "Alice Springs": 1970, "Brisbane": 1700 },
    "Brisbane": { "Darwin": 2700, "Melbourne": 1700 }
  };
  function findShortestPath(from, to) {
    const distances = {};
    const previous = {};
    const queue = [];
    for (const city in roads) {
      distances[city] = Infinity;
      previous[city] = null;
    }
    distances[from] = 0;
    queue.push(from);
    while (queue.length > 0) {
      const currentCity = queue.shift();
      for (const neighbor in roads[currentCity]) {
        const distance = roads[currentCity][neighbor];
        const newDistance = distances[currentCity] + distance;
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = currentCity;
          queue.push(neighbor);
        }
      }
    }
    const path = [];
    let currentCity = to;
    while (currentCity !== null) {
      path.unshift(currentCity);
      currentCity = previous[currentCity];
    }
    return { path, distance: distances[to] };
  }
  const result = findShortestPath("Alice Springs", "Brisbane");
  console.log(result.path);
  console.log(result.distance);
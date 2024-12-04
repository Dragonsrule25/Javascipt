function buildTable(data) {
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let keys = Object.keys(data[0]);
    keys.forEach(key => {
      let th = document.createElement("th");
      th.textContent = key.charAt(0).toUpperCase() + key.slice(1); 
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    let tbody = document.createElement("tbody");
    data.forEach(item => {
      let row = document.createElement("tr");
      keys.forEach(key => {
        let td = document.createElement("td");
        td.textContent = item[key];
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    document.body.appendChild(table);
  }
  let TABLE_DATA = [
    { name: "Fred", age: 30, job: "Engineer" },
    { name: "Sarah", age: 25, job: "Designer" },
    { name: "Tom", age: 40, job: "Developer" }
  ];
  buildTable(TABLE_DATA);
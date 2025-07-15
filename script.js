const data = [
  {
    key: "1",
    name: "Parent 1",
    age: 45,
    charges_per_hour: 40,
    charges_per_month: 6000,
    children: [
      {
        key: "1-1",
        name: "Child 1-1",
        age: 21,
        charges_per_hour: 20,
        charges_per_month: 3000,
        children: [
          {
            key: "1-1-1",
            name: "Grandchild 1-1-1",
            age: 5,
            charges_per_hour: 10,
            charges_per_month: 800
          }
        ]
      },
      {
        key: "1-2",
        name: "Child 1-2",
        age: 18,
        charges_per_hour: 18,
        charges_per_month: 2000
      }
    ]
  },
  {
    key: "2",
    name: "Parent 2",
    age: 52,
    charges_per_hour: 50,
    charges_per_month: 7000
  }
];

const tableBody = document.getElementById("table-body");

function createRow(item, level, parentKey = "") {
  const row = document.createElement("tr");
  row.classList.add(`level-${level}`);
  row.dataset.key = item.key;
  if (parentKey) {
    row.dataset.parent = parentKey;
    row.classList.add("hidden");
  }

  const hasChildren = item.children && item.children.length > 0;

  const nameCell = document.createElement("td");
  if (hasChildren) {
    const btn = document.createElement("span");
    btn.textContent = "▶";
    btn.className = "expand-btn";
    btn.onclick = () => toggleChildren(item.key, btn);
    nameCell.appendChild(btn);
  } else {
    nameCell.style.paddingLeft = `${level * 20}px`;
  }
  nameCell.appendChild(document.createTextNode(" " + item.name));
  row.appendChild(nameCell);

  row.appendChild(createCell(item.age));
  row.appendChild(createCell(item.charges_per_hour));
  row.appendChild(createCell(item.charges_per_month));

  tableBody.appendChild(row);

  if (hasChildren) {
    item.children.forEach(child =>
      createRow(child, level + 1, item.key)
    );
  }
}

function createCell(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

function toggleChildren(parentKey, btn) {
  const rows = document.querySelectorAll(`[data-parent='${parentKey}']`);
  const isExpanding = btn.textContent === "▶";
  btn.textContent = isExpanding ? "▼" : "▶";

  rows.forEach(row => {
    row.classList.toggle("hidden", !isExpanding);

    // Collapse all nested rows if collapsing
    if (!isExpanding) {
      const childBtn = row.querySelector(".expand-btn");
      if (childBtn && childBtn.textContent === "▼") {
        childBtn.textContent = "▶";
        toggleChildren(row.dataset.key, childBtn); // recursive collapse
      }
    }
  });
}

// Render table rows
data.forEach(item => createRow(item, 0));
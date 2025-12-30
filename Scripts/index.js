// 1. GLOBAL VARIABLE to store data
let allEmployees = []; 

// --- FETCH DATA ---
function loadEmployees() {
    const tableBody = document.getElementById("employee-table-body");
    tableBody.innerHTML = "<tr><td colspan='6' class='text-center'>Loading...</td></tr>";

    fetch('http://localhost:3000/employees')
        .then(response => response.json())
        .then(data => {
            // 2. Save data to global variable
            allEmployees = data; 
            
            // 3. Draw the table initially
            renderTable(allEmployees); 
        })
        .catch(error => console.error("Error loading data:", error));
}

// --- RENDER TABLE FUNCTION ---
function renderTable(data) {
    const tableBody = document.getElementById("employee-table-body");
    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6' class='text-center'>No employees found</td></tr>";
        return;
    }

    data.forEach((emp) => {
        const row = document.createElement("tr");

        // Name & Profile Image
        const nameCell = document.createElement("td");
        nameCell.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <img src="${emp.profileImage}" alt="" style="width: 30px; height: 30px; border-radius: 50%;">
                <span>${emp.name}</span>
            </div>
        `;
        row.appendChild(nameCell);

        // Gender
        const genderCell = document.createElement("td");
        genderCell.textContent = emp.gender;
        row.appendChild(genderCell);

        // Departments
        const deptCell = document.createElement("td");
        // Safety check to ensure departments is an array
        if (Array.isArray(emp.departments)) {
            emp.departments.forEach(dep => {
                const badge = document.createElement("span");
                badge.className = "badge badge-custom"; // Your custom class
                badge.textContent = dep;
                deptCell.appendChild(badge);
            });
        }
        row.appendChild(deptCell);

        // Salary
        const salaryCell = document.createElement("td");
        salaryCell.textContent = emp.salary;
        row.appendChild(salaryCell);

        // Start Date
        const dateCell = document.createElement("td");
        dateCell.textContent = emp.startDate;
        row.appendChild(dateCell);

        // Actions
        const actionCell = document.createElement("td");
        
        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-sm";
        deleteBtn.innerHTML = '<i class="bi bi-trash3-fill"></i>';
        deleteBtn.onclick = () => deleteEmployee(emp.id);
        actionCell.appendChild(deleteBtn);

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-sm me-1";
        editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>';
        editBtn.onclick = () => editEmployee(emp.id);
        actionCell.appendChild(editBtn);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

// --- DELETE FUNCTION ---
function deleteEmployee(id) {
    if(confirm("Are you sure you want to delete this employee?")) {
        fetch(`http://localhost:3000/employees/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) loadEmployees(); 
            else alert("Failed to delete.");
        })
        .catch(error => console.error("Error deleting:", error));
    }
}

// --- EDIT REDIRECT ---
function editEmployee(id){
    window.location.href = `form.html?id=${id}`;   
}

// --- SEARCH FUNCTIONALITY ---
const searchBtn = document.getElementById("search-box");

if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        // Create Input
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Search name or dept...";
        input.className = "form-control shadow-sm px-3 rounded-pill"; 
        input.style.width = "200px"; 
        input.style.borderColor = "#82A70C"; 

        // SEARCH LOGIC
        input.addEventListener('keyup', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            // Filter the GLOBAL variable 'allEmployees'
            const filteredData = allEmployees.filter(emp => {
                // 1. Check Name
                const nameMatch = emp.name.toLowerCase().includes(searchTerm);
                
                // 2. Check Departments (Array)
                // We use .some() to see if ANY department in the list matches the search term
                const deptMatch = Array.isArray(emp.departments) && emp.departments.some(dep => 
                    dep.toLowerCase().includes(searchTerm)
                );

                // Return true if EITHER matches
                return nameMatch || deptMatch;
            });

            // Re-draw table with only filtered results
            renderTable(filteredData);
        });

        // Close Logic (Revert to button on blur if empty)
        input.addEventListener('blur', function() {
            if (this.value === "") {
                this.replaceWith(searchBtn); 
                renderTable(allEmployees); 
            }
        });

        this.replaceWith(input);
        input.focus(); 
    });
}

// Initial Load
window.onload = loadEmployees;
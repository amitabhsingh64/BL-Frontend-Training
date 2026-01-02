$(document).ready(function () {
    
    // 1. GLOBAL VARIABLE
    let allEmployees = [];
    const $tableBody = $("#employee-table-body");
    const apiUrl = 'http://localhost:3000/employees';

    // --- FETCH DATA ---
    function loadEmployees() {
        $tableBody.html("<tr><td colspan='6' class='text-center'>Loading...</td></tr>");

        $.get(apiUrl)
            .done(function (data) {
                allEmployees = data;
                renderTable(allEmployees);
            })
            .fail(function (err) {
                console.error("Error loading data:", err);
                $tableBody.html("<tr><td colspan='6' class='text-center text-danger'>Error loading data</td></tr>");
            });
    }

    // --- RENDER TABLE ---
    function renderTable(data) {
        $tableBody.empty(); // Clear current content

        if (data.length === 0) {
            $tableBody.html("<tr><td colspan='6' class='text-center'>No employees found</td></tr>");
            return;
        }

        $.each(data, function (i, emp) {
            // Generate Badges HTML
            let deptHtml = '';
            if (Array.isArray(emp.departments)) {
                deptHtml = emp.departments.map(dep => 
                    `<span class="badge badge-custom">${dep}</span>`
                ).join(' ');
            }

            // Create Row HTML
            const rowHtml = `
                <tr>
                    <td>
                        <div class="d-flex align-items-center gap-2">
                            <img src="${emp.profileImage}" alt="" style="width: 30px; height: 30px; border-radius: 50%;">
                            <span>${emp.name}</span>
                        </div>
                    </td>
                    <td>${emp.gender}</td>
                    <td>${deptHtml}</td>
                    <td>${emp.salary}</td>
                    <td>${emp.startDate}</td>
                    <td>
                        <button class="btn btn-sm me-1 edit-btn" data-id="${emp.id}">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button class="btn btn-sm delete-btn" data-id="${emp.id}">
                            <i class="bi bi-trash3-fill"></i>
                        </button>
                    </td>
                </tr>
            `;
            $tableBody.append(rowHtml);
        });
    }

    // --- ACTION: DELETE (Event Delegation) ---
    // We bind click to 'document' because .delete-btn doesn't exist on page load
    $(document).on('click', '.delete-btn', function () {
        const id = $(this).data('id');
        
        if (confirm("Are you sure you want to delete this employee?")) {
            $.ajax({
                url: `${apiUrl}/${id}`,
                type: 'DELETE',
                success: function () {
                    loadEmployees(); // Reload table
                },
                error: function (err) {
                    console.error("Error deleting:", err);
                    alert("Failed to delete.");
                }
            });
        }
    });

    // --- ACTION: EDIT (Event Delegation) ---
    $(document).on('click', '.edit-btn', function () {
        const id = $(this).data('id');
        window.location.href = `form.html?id=${id}`;
    });

    // --- SEARCH FUNCTIONALITY ---
    const $searchBtn = $("#search-box");

    if ($searchBtn.length) {
        $searchBtn.on('click', function () {
            const $btn = $(this);
            
            // Create Input
            const $input = $('<input>', {
                type: 'text',
                placeholder: 'Search name or dept...',
                class: 'form-control shadow-sm px-3 rounded-pill',
                css: { width: '200px', borderColor: '#82A70C' }
            });

            // Replace button with input
            $btn.replaceWith($input);
            $input.focus();

            // Search Logic (KeyUp)
            $input.on('keyup', function () {
                const searchTerm = $(this).val().toLowerCase();

                const filteredData = allEmployees.filter(emp => {
                    const nameMatch = emp.name.toLowerCase().includes(searchTerm);
                    const deptMatch = Array.isArray(emp.departments) && emp.departments.some(dep => 
                        dep.toLowerCase().includes(searchTerm)
                    );
                    return nameMatch || deptMatch;
                });

                renderTable(filteredData);
            });

            // Revert on Blur if empty
            $input.on('blur', function () {
                if ($(this).val() === "") {
                    $(this).replaceWith($btn); // Put the original button variable back
                    // Need to re-attach the click event because the element was removed from DOM
                    $btn.on('click', arguments.callee); // Or simply reload page logic, but here we just re-render
                    renderTable(allEmployees);
                }
            });
        });
    }

    // Initial Load
    loadEmployees();
});
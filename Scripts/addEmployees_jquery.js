$(document).ready(function () {
  // --- Define Selectors ---
  const $dateSelect = $('#date');
  const $monthSelect = $('#month');
  const $yearSelect = $('#year');
  const $submitBtn = $('#btnSubmit');

  // --- 1. Populate Date Selectors ---

  // Populate years (2000-2030)
  for (let y = 2000; y <= 2030; y++) {
    $yearSelect.append($('<option>', { value: y, text: y }));
  }

  // Populate months
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  $.each(monthNames, function (i, m) {
    $monthSelect.append($('<option>', { value: i + 1, text: m }));
  });

  // Update days based on month/year
  function updateDays() {
    const year = parseInt($yearSelect.val());
    const month = parseInt($monthSelect.val());

    // Safety check: only run if year and month are selected
    if (!year || !month) return;

    const daysInMonth = new Date(year, month, 0).getDate();

    // Clear and reset default option
    $dateSelect.html('<option value="">Date</option>');

    for (let i = 1; i <= daysInMonth; i++) {
      $dateSelect.append($('<option>', { value: i, text: i }));
    }
  }

  // Bind change events
  $('#year, #month').on('change', updateDays);


  // --- 2. CHECK FOR EDIT MODE ON LOAD ---
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (id) {
    console.log("Edit Mode Detected for ID:", id);
    $submitBtn.text("Update");

    // Fetch Data using jQuery AJAX
    $.get(`http://localhost:3000/employees/${id}`)
      .done(function (emp) {
        // Fill simple fields
        $('#eName').val(emp.name);
        $('#salaryRange').val(emp.salary);
        $('#Textarea1').val(emp.notes);

        // Set Radio Buttons & Checkboxes
        $(`input[name="gender"][value="${emp.gender}"]`).prop('checked', true);
        $(`input[name="profile"][value="${emp.profileImage}"]`).prop('checked', true);

        if (Array.isArray(emp.departments)) {
          $.each(emp.departments, function (i, dept) {
            $(`input[name="DepartmentOptions"][value="${dept}"]`).prop('checked', true);
          });
        }

        // Handle Date Logic
        if (emp.startDate) {
          const [day, month, year] = emp.startDate.split('-');
          $yearSelect.val(year);
          
          const monthIndex = monthNames.indexOf(month) + 1;
          $monthSelect.val(monthIndex);

          // Force update days immediately so the 'day' option exists before we select it
          updateDays();
          $dateSelect.val(day);
        }
      })
      .fail(function () {
        console.error("Error loading employee data");
      });
  }

  // --- 3. VALIDATION ---
  function validateFormData() {
    // Reset previous errors
    $('.text-danger').text('').css('color', ''); 

    const name = $('#eName').val().trim();
    const profileImage = $('input[name="profile"]:checked').val();
    const gender = $('input[name="gender"]:checked').val();
    // Get all checked departments and map to array
    const departments = $('input[name="DepartmentOptions"]:checked').map(function() {
        return this.value;
    }).get();
    
    const salary = $('#salaryRange').val();
    const date = $dateSelect.val();
    const month = $monthSelect.val();
    const year = $yearSelect.val();
    const notes = $('#Textarea1').val().trim();

    // Name Regex
    const name_regex = /^[a-zA-Z\s'-]+$/;
    if (!name_regex.test(name)) {
      $('#name_validation').text("Invalid Name").css('color', 'red');
      return null;
    }

    if (!profileImage) {
      $('#profile_validation').text("Select Profile Image").css('color', 'red');
      return null;
    }

    if (!gender) {
      $('#Gender_validation').text("Select Gender").css('color', 'red');
      return null;
    }

    if (departments.length === 0) {
      $('#Department_validation').text("Select Department").css('color', 'red');
      return null;
    }

    if (!salary || salary === "Select Salary") {
      $('#salary_validation').text("Select Salary").css('color', 'red');
      return null;
    }

    if (!date) {
      $('#date_validation').text("Select Date").css('color', 'red');
      return null;
    }

    return {
      name: name,
      profileImage: profileImage,
      gender: gender,
      departments: departments,
      salary: salary,
      startDate: `${date}-${monthNames[month - 1]}-${year}`,
      notes: notes
    };
  }


  // --- 4. SAVE DATA (AJAX) ---
  function saveToDB(empObj) {
    const redirectUrl = "./index.html";
    let url = 'http://localhost:3000/employees';
    let type = 'POST';

    // If ID exists, we are UPDATING
    if (id) {
      url += `/${id}`;
      type = 'PUT';
    }

    $.ajax({
      url: url,
      type: type,
      contentType: 'application/json',
      data: JSON.stringify(empObj),
      success: function () {
        alert(id ? "Employee Updated!" : "Employee Added!");
        window.location.href = redirectUrl;
      },
      error: function (err) {
        console.error("Error saving data:", err);
        alert("Failed to save data.");
      }
    });
  }

  // --- 5. EVENT LISTENERS ---
  
  $submitBtn.click(function (e) {
    e.preventDefault();
    const formData = validateFormData();
    if (formData) {
      saveToDB(formData);
    }
  });

  $('#btnCancel').click(function (e) {
    e.preventDefault();
    window.location.href = "./index.html";
  });

});
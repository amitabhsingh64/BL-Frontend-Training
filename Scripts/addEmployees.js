// --- Populate Date Selectors ---
const dateSelect = document.getElementById('date');
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');

// Populate years (2000-2030)
for (let y = 2000; y <= 2030; y++) {
  const opt = document.createElement('option');
  opt.value = y;
  opt.text = y;
  yearSelect.appendChild(opt);
}

// Populate months
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
monthNames.forEach((m, i) => {
  const opt = document.createElement('option');
  opt.value = i + 1;
  opt.text = m;
  monthSelect.appendChild(opt);
});

// Update days based on month/year
function updateDays() {
  const year = +yearSelect.value;
  const month = +monthSelect.value;
  const daysInMonth = new Date(year, month, 0).getDate();
  dateSelect.innerHTML = '<option value="">Date</option>';
  for (let i = 1; i <= daysInMonth; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.text = i;
    dateSelect.appendChild(opt);
  }
}
yearSelect.addEventListener('change', updateDays);
monthSelect.addEventListener('change', updateDays);
updateDays();


// --- CHECK FOR EDIT MODE ON LOAD ---
window.addEventListener('DOMContentLoaded', () => {
    // 1. Get the ID from the URL (e.g., ?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        console.log("Edit Mode Detected for ID:", id);
        
        // 2. Change Submit Button Text to "Update"
        const submitBtn = document.getElementById('btnSubmit');
        if (submitBtn) submitBtn.innerText = "Update";

        // 3. Fetch Data for this specific employee
        fetch(`http://localhost:3000/employees/${id}`)
            .then(response => response.json())
            .then(emp => {
                // 4. Fill the Form Fields
                document.getElementById('eName').value = emp.name;
                document.getElementById('salaryRange').value = emp.salary;
                document.getElementById('Textarea1').value = emp.notes;

                // Set Gender Radio
                let genderRadio = document.querySelector(`input[name="gender"][value="${emp.gender}"]`);
                if (genderRadio) genderRadio.checked = true;

                // Set Profile Image Radio
                let profileRadio = document.querySelector(`input[name="profile"][value="${emp.profileImage}"]`);
                if (profileRadio) profileRadio.checked = true;

                // Set Department Checkboxes
                if (Array.isArray(emp.departments)) {
                    emp.departments.forEach(dept => {
                        let checkbox = document.querySelector(`input[name="DepartmentOptions"][value="${dept}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                }

                // Set Date (Parse "12-January-2023")
                if (emp.startDate) {
                    const [day, month, year] = emp.startDate.split('-');
                    
                    document.getElementById('year').value = year;
                    
                    // We need the index of the month (January = 1)
                    const monthIndex = monthNames.indexOf(month) + 1; 
                    document.getElementById('month').value = monthIndex;

                    // Trigger updateDays() so the correct days populate for that month
                    updateDays(); 
                    
                    document.getElementById('date').value = day;
                }
            })
            .catch(err => console.error("Error loading employee data:", err));
    }
});

function validateFormData() {
  const name = document.getElementById('eName').value.trim();
  const profileImage = document.querySelector('input[name="profile"]:checked');
  const gender = document.querySelector('input[name="gender"]:checked');
  const departments = document.querySelectorAll('input[name="DepartmentOptions"]:checked');
  const salary = document.getElementById('salaryRange').value;
  const date = dateSelect.value;
  const month = monthSelect.value;
  const year = yearSelect.value;
  const notes = document.getElementById('Textarea1').value.trim();
  
  // DEBUGGING LOGS
  console.log("Name:", name);
  console.log("Profile:", profileImage);
  console.log("Gender:", gender);
  console.log("Departments Count:", departments.length);
  console.log("Salary:", salary);
  console.log("Date:", date, "Month:", month, "Year:", year);

  //name validation using regex
  const name_regex = new RegExp(/^[a-zA-Z\s'-]+$/);
  if(!name_regex.test(name)){
    const name_text = document.getElementById("name_validation");
    name_text.innerHTML = "Invalid Name";
    name_text.style.color = "red";
    return null;
  }

  //profileImage validation
  if(!profileImage){
    const profile_invalid = document.getElementById("profile_validation");
    profile_invalid.innerHTML = "Select Profile Image";
    profile_invalid.style.color = "red";
    return null;
  }

  //Gender validation
  if(!gender){
    const profile_invalid = document.getElementById("Gender_validation");
    profile_invalid.innerHTML = "Select Gender";
    profile_invalid.style.color = "red";
    return null;
  }

  //Department validation
  if(departments.length===0){
    const profile_invalid = document.getElementById("Department_validation");
    profile_invalid.innerHTML = "Select Department";
    profile_invalid.style.color = "red";
    return null;
  }

  //salary validation
  if(!salary || salary=="Select Salary"){
    const profile_invalid = document.getElementById("salary_validation");
    profile_invalid.innerHTML = "Select salary";
    profile_invalid.style.color = "red";
    return null;
  }

  //date validation
  if(!date){
    const profile_invalid = document.getElementById("date_validation");
    profile_invalid.innerHTML = "Select date";
    profile_invalid.style.color = "red";
    return null;
  }

//   if (!name || !profileImage || !gender || departments.length === 0 || !salary || !date || !month || !year) {
//     alert('Please fill in all required fields.');
//     return null;}

  const deptArray = Array.from(departments).map(d => d.value);

  return {
    name,
    profileImage: profileImage.value,
    gender: gender.value,
    departments: deptArray,
    salary,
    startDate: `${date}-${monthNames[month - 1]}-${year}`,
    notes
  };
}

function saveToLocalStorage(empObj) {
  const data = JSON.parse(localStorage.getItem('employees')) || [];

  const isDuplicate = data.some(emp =>
    emp.name === empObj.name &&
    emp.gender === empObj.gender &&
    emp.startDate === empObj.startDate
  );

  if (isDuplicate) {
    alert("Duplicate employee entry.");
    return;
  }

  data.push(empObj);
  localStorage.setItem('employees', JSON.stringify(data));
  window.location.href = "./index.html";
}

function saveToDB(empObj) {
    const redirectUrl = "./index.html";
    // Check if we are editing (do we have an ID in the URL?)
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        // --- UPDATE EXISTING (PUT) ---
        fetch(`http://localhost:3000/employees/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empObj)
        }).then(() => {
            alert("Employee Updated!");
            window.location.href = redirectUrl;
        });

    } else {
        // --- CREATE NEW (POST) ---
        fetch('http://localhost:3000/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empObj)
        }).then(() => {
            alert("Employee Added!");
            window.location.href = redirectUrl;
        });
    }
}


// Event Listeners
document.getElementById('btnSubmit').addEventListener('click', function (e) {
  e.preventDefault();
  const formData = validateFormData();
  if (formData) {
    // saveToLocalStorage(formData);
    saveToDB(formData);
    window.location.href = "./index.html";
  }
});

document.getElementById('btnCancel').addEventListener('click', (e) => {
    e.preventDefault;
  window.location.href = "./index.html";
});
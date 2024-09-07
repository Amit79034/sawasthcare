// Functionality to handle modal visibility
function manageQueue() {
  document.getElementById("queue-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("queue-modal").style.display = "none";
}

// Placeholder for Bed Tracking and Admissions
function trackBeds() {
  alert("Bed availability tracking coming soon!");
}

function manageAdmissions() {
  alert("Patient admission management coming soon!");
}

// Queue Management Logic
let queue = [];

// Function to add a patient to the queue
function addPatient() {
  const patientNameInput = document.getElementById("patientName");
  const patientName = patientNameInput.value.trim();

  if (patientName) {
    queue.push({ name: patientName, time: new Date().toLocaleTimeString() });
    updateQueueDisplay();
    patientNameInput.value = ""; // clear input after adding
  } else {
    alert("Please enter a valid patient name");
  }
}

// Function to serve the next patient (remove first from the queue)
function serveNextPatient() {
  if (queue.length > 0) {
    const nextPatient = queue.shift(); // remove the first patient
    alert(`Now serving: ${nextPatient.name}`);
    updateQueueDisplay();
  } else {
    alert("No patients in the queue");
  }
}

// Function to update the displayed queue
function updateQueueDisplay() {
  const queueList = document.getElementById("queueList");
  queueList.innerHTML = "<h3>Patient Queue</h3>"; // reset the queue display

  queue.forEach((patient, index) => {
    const queueItem = document.createElement("div");
    queueItem.className = "queue-item";
    queueItem.innerHTML = `<span>${index + 1}. ${patient.name}</span> <span>${
      patient.time
    }</span>`;
    queueList.appendChild(queueItem);
  });
}

// Bed tracking system: Mock data for departments and beds
let departments = [
  { name: "Surgery", totalBeds: 10, occupiedBeds: 5 },
  { name: "Pediatrics", totalBeds: 8, occupiedBeds: 2 },
  { name: "ICU", totalBeds: 5, occupiedBeds: 4 },
];

// Function to open the bed availability modal
function trackBeds() {
  document.getElementById("bed-modal").style.display = "block";
  updateBedDisplay();
}

// Function to close the bed availability modal
function closeBedModal() {
  document.getElementById("bed-modal").style.display = "none";
}

// Function to update the displayed bed availability in the modal
function updateBedDisplay() {
  const departmentList = document.getElementById("departments");
  departmentList.innerHTML = ""; // Clear previous content

  departments.forEach((dept, index) => {
    const departmentItem = document.createElement("div");
    departmentItem.className = "department";

    // Create a display for department and its bed availability
    departmentItem.innerHTML = `
            <h3>${dept.name} Department</h3>
            <p>Total Beds: ${dept.totalBeds}</p>
            <p>Occupied Beds: <span id="occupied-${index}">${
      dept.occupiedBeds
    }</span></p>
            <p>Available Beds: <span id="available-${index}">${
      dept.totalBeds - dept.occupiedBeds
    }</span></p>
            <button onclick="admitPatient(${index})">Admit Patient</button>
            <button onclick="dischargePatient(${index})">Discharge Patient</button>
            <hr>
        `;
    departmentList.appendChild(departmentItem);
  });
}

// Function to admit a patient (occupy a bed)
function admitPatient(departmentIndex) {
  const department = departments[departmentIndex];

  if (department.occupiedBeds < department.totalBeds) {
    department.occupiedBeds++;
    updateBedDisplay(); // Refresh the display
  } else {
    alert(`No available beds in ${department.name} department!`);
  }
}

// Function to discharge a patient (free a bed)
function dischargePatient(departmentIndex) {
  const department = departments[departmentIndex];

  if (department.occupiedBeds > 0) {
    department.occupiedBeds--;
    updateBedDisplay(); // Refresh the display
  } else {
    alert(`All beds are already free in ${department.name} department!`);
  }
}

// Function to simulate updating bed availability
function updateBedAvailability() {
  updateBedDisplay();
}

// List to store admitted patients
let admittedPatients = [];

// Function to open the admission modal
function manageAdmissions() {
  document.getElementById("admission-modal").style.display = "block";
}

// Function to close the admission modal
function closeAdmissionModal() {
  document.getElementById("admission-modal").style.display = "none";
}

// Function to add a new patient to the admission list
document
  .getElementById("admissionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get patient details from form
    const patientName = document.getElementById("patientNameAdmission").value;
    const patientAge = document.getElementById("patientAge").value;
    const department = document.getElementById("admissionDepartment").value;
    const reason = document.getElementById("admissionReason").value;

    // Create patient object
    const newPatient = {
      name: patientName,
      age: patientAge,
      department: department,
      reason: reason,
      admissionTime: new Date().toLocaleString(),
    };

    // Add patient to the admitted patients list
    admittedPatients.push(newPatient);

    // Clear form inputs
    document.getElementById("admissionForm").reset();

    // Update patient list display
    updateAdmittedPatientsDisplay();
  });

// Function to display admitted patients in the list
function updateAdmittedPatientsDisplay() {
  const patientsList = document.getElementById("admittedPatientsList");
  patientsList.innerHTML = ""; // Clear previous list

  admittedPatients.forEach((patient, index) => {
    const patientItem = document.createElement("div");
    patientItem.className = "patient-item";

    patientItem.innerHTML = `
            <p><strong>Name:</strong> ${patient.name}</p>
            <p><strong>Age:</strong> ${patient.age}</p>
            <p><strong>Department:</strong> ${patient.department}</p>
            <p><strong>Reason:</strong> ${patient.reason}</p>
            <p><strong>Admitted At:</strong> ${patient.admissionTime}</p>
            <button onclick="dischargePatient(${index})">Discharge</button>
            <hr>
        `;

    patientsList.appendChild(patientItem);
  });
}

// Function to discharge a patient (remove from the list)
function dischargePatient(patientIndex) {
  admittedPatients.splice(patientIndex, 1); // Remove the patient from the array
  updateAdmittedPatientsDisplay(); // Refresh the display
}

//contact page..
// Get elements
const openFormButton = document.getElementById("openFormButton");
const contactFormContainer = document.getElementById("contactFormContainer");
const contactForm = document.getElementById("contactForm");
const submittedInfo = document.getElementById("submittedInfo");

// Show the form when the "Contact Us" button is clicked
openFormButton.addEventListener("click", function () {
  contactFormContainer.classList.toggle("hidden");
});

// Handle form submission
contactForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page refresh on submit

  // Get input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  // Display submitted info
  submittedInfo.innerHTML = `
        <h3>Submitted Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}</p>
    `;

  // Show the submitted info section
  submittedInfo.style.display = "block";

  // Optionally clear form inputs after submission
  contactForm.reset();
});
function getStarted() {
  window.location.href = "/signup.html"; // Redirect to the signup page
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("moodForm");
  const moodLogContainer = document.getElementById("logContainer");

  // Load previous logs from localStorage
  const loadLogs = () => {
    const logs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    moodLogContainer.innerHTML = ""; // Clear existing logs

    logs.forEach((log, index) => {
      const logElement = document.createElement("div");
      logElement.classList.add("mood-log");
      logElement.innerHTML = `
        <strong>${log.mood} Mood</strong>
        <p>${log.description}</p>
        <button class="delete-log-btn" data-index="${index}">Delete</button>
      `;

      // Attach delete event
      const deleteBtn = logElement.querySelector(".delete-log-btn");
      deleteBtn.addEventListener("click", () => {
        logs.splice(index, 1);
        localStorage.setItem("moodLogs", JSON.stringify(logs));
        loadLogs();
      });

      moodLogContainer.appendChild(logElement);
    });
  };

  // Event listener for form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission and page reload

    const selectedMood = document.querySelector('input[name="mood"]:checked')?.value;
    const moodDescription = document.getElementById("moodDetails").value;

    if (!selectedMood || !moodDescription) {
      alert("Please select a mood and write a description.");
      return;
    }

    const newLog = {
      mood: selectedMood,
      description: moodDescription
    };

    // Save new log to localStorage
    const logs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    logs.push(newLog);
    localStorage.setItem("moodLogs", JSON.stringify(logs));

    form.reset(); // Clear form
    loadLogs(); // Reload the logs
  });

  // Initial load of logs
  loadLogs();
});
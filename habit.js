document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("habitForm");
  const habitList = document.getElementById("habitList");
  const addHabitBtn = document.getElementById("addHabitBtn");
  const habitNameInput = document.getElementById("habitName");
  const habitRoutineInput = document.getElementById("habitRoutine");
  const habitGoalInput = document.getElementById("habitGoal");

  // Load habits from localStorage
  const loadHabits = () => {
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    const listContainer = habitList;
    listContainer.innerHTML = "<h3>Your Habits</h3>"; // Title

    habits.forEach((habit, index) => {
      const div = document.createElement("div");
      div.className = "habit-item";
      div.innerHTML = `
        <input type="checkbox" id="habit-${index}" ${habit.checked ? "checked" : ""}>
        <div class="habit-details">
          <h4>${habit.name}</h4>
          <p><strong>Routine:</strong> ${habit.routine}</p>
          <p><strong>Goal:</strong> ${habit.goal}</p>
        </div>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;

      const checkbox = div.querySelector("input");
      checkbox.addEventListener("change", () => {
        habits[index].checked = checkbox.checked;
        localStorage.setItem("habits", JSON.stringify(habits));
      });

      const deleteBtn = div.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        habits.splice(index, 1);
        localStorage.setItem("habits", JSON.stringify(habits));
        loadHabits();
      });

      listContainer.appendChild(div);
    });
  };

  // Handle form submission to save a new habit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = habitNameInput.value.trim();
    const routine = habitRoutineInput.value.trim();
    const goal = habitGoalInput.value.trim();
    if (!name || !routine || !goal) return;
    const newHabit = { name, routine, goal, checked: false };
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.push(newHabit);
    localStorage.setItem("habits", JSON.stringify(habits));
    form.reset();
    form.style.display = "none";
    addHabitBtn.style.display = "block";
    loadHabits();
  });

  // Toggle form visibility when Add New Habit button is clicked
  addHabitBtn.addEventListener("click", () => {
    form.style.display = "flex";
    addHabitBtn.style.display = "none";
  });

  // Initially hide the form if there are already habits
  if (localStorage.getItem("habits")) {
    form.style.display = "none";
    addHabitBtn.style.display = "block";
  } else {
    form.style.display = "flex";
    addHabitBtn.style.display = "none";
  }

  loadHabits();
});
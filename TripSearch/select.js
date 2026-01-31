// ✅ read category from URL like: select.html?category=devotional
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "trip";

const pageTitle = document.getElementById("pageTitle");
const categoryText = document.getElementById("categoryText");
const resultBox = document.getElementById("resultBox");

const tripForm = document.getElementById("tripForm");

const categoryTitleMap = {
  devotional: "Devotional Trip Details",
  holiday: "Holiday Trip Details",
  honeymoon: "Honeymoon Trip Details",
  business: "Business Trip Details",
  weekend: "Weekend Trip Details",
  family: "Family Trip Details",
  adventure: "Adventure Trip Details",
  food: "Food Trip Details",
};

pageTitle.textContent = categoryTitleMap[category] || "Trip Details";
categoryText.textContent = category.toUpperCase();

function goBack() {
  window.location.href = "index.html";
}

// ✅ Theme logic (same as your main page)
const themeIcon = document.getElementById("themeIcon");

function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("theme-dark");
    document.body.classList.remove("theme-light");
    themeIcon.textContent = "light_mode";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.add("theme-light");
    document.body.classList.remove("theme-dark");
    themeIcon.textContent = "dark_mode";
    localStorage.setItem("theme", "light");
  }
}

function toggleTheme() {
  const isDark = document.body.classList.contains("theme-dark");
  setTheme(isDark ? "light" : "dark");
}

window.toggleTheme = toggleTheme;
window.goBack = goBack;

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

// ✅ Submit Form
tripForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    category,
    from: document.getElementById("fromCity").value.trim(),
    to: document.getElementById("toCity").value.trim(),
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    travellers: document.getElementById("travellers").value,
    budget: document.getElementById("budget").value,
  };

  // ✅ validate end date >= start date
  if (data.endDate < data.startDate) {
    alert("End date cannot be before Start date ❌");
    return;
  }

  // Show output on screen (later connect backend / AI)
  resultBox.style.display = "block";
  resultBox.textContent =
    "✅ Trip Details Submitted\n\n" +
    JSON.stringify(data, null, 2);
});

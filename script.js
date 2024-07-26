const monthYear = document.getElementById("monthYear");
const dates = document.getElementById("dates");
const noteInput = document.getElementById("noteInput");
const addNoteButton = document.getElementById("addNote");
const noteList = document.getElementById("noteList");

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Takvimi oluştur
function renderCalendar(month, year) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    monthYear.textContent = `${getMonthName(month)} ${year}`;
    dates.innerHTML = '';

    // Boş günler
    for (let i = 0; i < startingDay; i++) {
        const dateElement = document.createElement("div");
        dateElement.classList.add("date");
        dateElement.textContent = '';
        dates.appendChild(dateElement);
    }

    // Günler
    for (let i = 1; i <= daysInMonth; i++) {
        const dateElement = document.createElement("div");
        dateElement.classList.add("date");
        dateElement.textContent = i;
        dateElement.setAttribute("data-day", i);
        dateElement.setAttribute("data-month", month);
        dateElement.setAttribute("data-year", year);
        dates.appendChild(dateElement);
    }

    // Notları kontrol et ve işaretle
    checkAndMarkNotes();
}

// Takvimi göster
renderCalendar(currentMonth, currentYear);

// Önceki ayı göster
document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth -= 1;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    }
    renderCalendar(currentMonth, currentYear);
});

// Sonraki ayı göster
document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth += 1;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    renderCalendar(currentMonth, currentYear);
});

// Not ekle
addNoteButton.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
        const noteItem = document.createElement("div");
        noteItem.classList.add("noteItem");
        noteItem.textContent = noteText;
        noteList.appendChild(noteItem);

        const selectedDate = document.querySelector(".date.selected");
        if (selectedDate) {
            const day = selectedDate.getAttribute("data-day");
            const month = selectedDate.getAttribute("data-month");
            const year = selectedDate.getAttribute("data-year");
            const key = `${year}-${month}-${day}`;
            localStorage.setItem(key, noteText);
            selectedDate.classList.add("hasNote");
        }
        noteInput.value = '';
    }
});

// Notları kontrol et ve işaretle
function checkAndMarkNotes() {
    const allDates = document.querySelectorAll(".date");
    allDates.forEach(date => {
        const day = date.getAttribute("data-day");
        const month = date.getAttribute("data-month");
        const year = date.getAttribute("data-year");
        const key = `${year}-${month}-${day}`;
        const noteText = localStorage.getItem(key);
        if (noteText) {
            date.classList.add("hasNote");
        }
    });
}

// Tarih seçildiğinde notları göster
dates.addEventListener("click", (event) => {
    const selectedDate = document.querySelector(".date.selected");
    if (selectedDate) {
        selectedDate.classList.remove("selected");
    }
    if (event.target.classList.contains("date")) {
        event.target.classList.add("selected");
        const day = event.target.getAttribute("data-day");
        const month = event.target.getAttribute("data-month");
        const year = event.target.getAttribute("data-year");
        const key = `${year}-${month}-${day}`;
        const noteText = localStorage.getItem(key) || '';
        noteInput.value = noteText;
    }
});

// Yardımcı fonksiyonlar
function getMonthName(month) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[month];
}

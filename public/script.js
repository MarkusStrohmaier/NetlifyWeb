// Funktion, um alle Seiteninhalte auszublenden
function hideAllPages() {
    var pages = document.querySelectorAll('.pageContent');
    pages.forEach(function(page) {
        page.style.display = 'none';
    });
}


// Home-Link
document.getElementById('homeLink').addEventListener('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Links
    hideAllPages();
    document.getElementById('homeContent').style.display = 'block';
});

// Chronik-Link
document.getElementById('chronikLink').addEventListener('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Links
    hideAllPages();
    document.getElementById('chronikContent').style.display = 'block';
});

// Termine-Link
document.getElementById('termineLink').addEventListener('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Links
    hideAllPages();
    document.getElementById('termineContent').style.display = 'block';
});

// Fotogalerie-Link
document.getElementById('fotogalerieLink').addEventListener('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Links
    hideAllPages();
    document.getElementById('fotogalerieContent').style.display = 'block';
});

// Impressum-Link
document.getElementById('impressumLink').addEventListener('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Links
    hideAllPages();
    document.getElementById('impressumContent').style.display = 'block';
});

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const daysOfWeek = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const notes = {}; // Objekt zum Speichern der Notizen

    function createCalendar(month, year) {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const firstDay = firstDayOfMonth.getDay();
        const lastDate = lastDayOfMonth.getDate();

        let calendarHTML = '<table>';
        calendarHTML += '<tr>';

        daysOfWeek.forEach(day => {
            calendarHTML += `<th>${day}</th>`;
        });
        calendarHTML += '</tr><tr>';

        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<td class="empty"></td>';
        }

        for (let day = 1; day <= lastDate; day++) {
            const dateString = `${year}-${month + 1}-${day}`;
            let note = notes[dateString] || '';

            if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
                calendarHTML += '</tr><tr>';
            }

            // Wenn der Tag eine Notiz hat, zeige sie an
            calendarHTML += `
                <td class="calendar-day" onclick="showNoteInput('${dateString}')">
                    ${day}
                    <div class="note-text">${note}</div>
                </td>
            `;
        }

        calendarHTML += '</tr></table>';
        document.getElementById('calendar').innerHTML = calendarHTML;
    }

    function showNoteInput(date) {
        document.getElementById('noteInput').value = notes[date] || ''; // Zeige vorhandene Notiz
        document.getElementById('noteMessage').innerHTML = `Notiz für den ${date}`;
        document.getElementById('noteInput').focus();
        document.getElementById('noteInput').setAttribute('data-date', date);
    }

    function saveNote() {
        const date = document.getElementById('noteInput').getAttribute('data-date');
        const note = document.getElementById('noteInput').value;
        if (date && note !== '') {
            notes[date] = note;
            createCalendar(currentMonth, currentYear); // Kalender neu laden
            document.getElementById('noteMessage').innerHTML = `Notiz für den ${date} gespeichert.`;
            document.getElementById('noteInput').value = ''; // Eingabefeld leeren
        }
    }

    createCalendar(currentMonth, currentYear); // Zeige den Kalender
});

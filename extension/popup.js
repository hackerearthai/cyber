document.addEventListener("DOMContentLoaded", () => {
  console.log('popup.js: DOMContentLoaded');
  const rangeRadios = document.querySelectorAll('input[name="range"]');
  const dateRangeDiv = document.getElementById("date-range");
  const scanBtn = document.getElementById("scan-btn");
  const statusDiv = document.getElementById("status");
  const resultsDiv = document.getElementById("results");

  rangeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      dateRangeDiv.style.display = radio.value === "custom" ? "block" : "none";
    });
  });

  // Update date range display when dates are selected
  const fromDateInput = document.getElementById("from-date");
  const toDateInput = document.getElementById("to-date");
  const dateRangeText = document.getElementById("date-range-text");

  function updateDateRangeDisplay() {
    if (fromDateInput.value && toDateInput.value) {
      const fromDate = new Date(fromDateInput.value);
      const toDate = new Date(toDateInput.value);
      const fromFormatted = fromDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const toFormatted = toDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      dateRangeText.textContent = `📆 ${fromFormatted} to ${toFormatted}`;
    } else if (fromDateInput.value || toDateInput.value) {
      dateRangeText.textContent = `⚠️ Please select both dates`;
    } else {
      dateRangeText.textContent = `📅 Select dates to scan`;
    }
  }

  fromDateInput.addEventListener("change", updateDateRangeDisplay);
  toDateInput.addEventListener("change", updateDateRangeDisplay);

  // show information about any previous or running scan
  const viewBtn = document.getElementById('view-results-btn');

  chrome.runtime.sendMessage({ action: 'getScanStatus' }, (resp) => {
    if (resp && resp.success && resp.status) {
      if (resp.status.status === 'scanning') {
        statusDiv.textContent = 'A scan is currently running';
        viewBtn.style.display = 'inline-block';
      } else if (resp.status.status === 'done') {
        statusDiv.textContent = 'Last scan completed – open the results window';
        viewBtn.style.display = 'inline-block';
      }
    }
  });

  viewBtn.addEventListener('click', () => {
    chrome.windows.create({
      url: chrome.runtime.getURL('scan.html'),
      type: 'popup',
      width: 500,
      height: 600
    });
  });

  scanBtn.addEventListener("click", () => {
    console.log('scan button clicked');

    let fromDate, toDate;
    const selected = document.querySelector('input[name="range"]:checked').value;

    if (selected === "24hrs") {
      const now = new Date();
      const yesterday = new Date();
      yesterday.setDate(now.getDate() - 1);

      fromDate = yesterday.toISOString().split("T")[0];
      toDate = now.toISOString().split("T")[0];
    } else {
      fromDate = document.getElementById("from-date").value;
      toDate = document.getElementById("to-date").value;
      if (!fromDate || !toDate) {
        statusDiv.textContent = "Please select both dates.";
        return;
      }
    }

    statusDiv.textContent = "Starting scan...";
    resultsDiv.innerHTML = "";

    // tell background to perform the scan and keep going even if popup closes
    chrome.runtime.sendMessage({ action: "startScan", fromDate, toDate }, (response) => {
      if (!response || !response.success) {
        statusDiv.textContent = "Error starting scan.";
        console.error(response ? response.error : "No response from background");
        return;
      }

      // open a persistent window to show progress and results
      chrome.windows.create({
        url: chrome.runtime.getURL('scan.html'),
        type: 'popup',
        width: 500,
        height: 600
      });

      // optionally close the popup itself since user will see the scan window
      window.close();
    });
  });
});

function formatDate(d) {
  if (!(d instanceof Date)) d = new Date(d);
  let month = '' + (d.getMonth()+1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0'+month;
  if (day.length < 2) day = '0'+day;
  return `${year}-${month}-${day}`;
}
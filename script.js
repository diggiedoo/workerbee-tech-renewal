const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const requestDialog = document.querySelector(".request-dialog");
const requestForm = document.querySelector(".request-form");
const dialogSuccess = document.querySelector(".dialog-success");
const requestType = requestForm.elements.requestType;
const toast = document.querySelector(".toast");
let requestText = "";
let toastTimeout;

document.querySelector("#current-year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("is-open", !isExpanded);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelectorAll("[data-open-request]").forEach((button) => {
  button.addEventListener("click", () => {
    requestForm.reset();
    requestForm.hidden = false;
    dialogSuccess.hidden = true;
    requestType.value = button.dataset.requestType || "estimate";
    requestDialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => requestDialog.close());
requestDialog.addEventListener("click", (event) => {
  if (event.target === requestDialog) requestDialog.close();
});

requestForm.elements.phone.addEventListener("input", (event) => {
  const digits = event.target.value.replace(/\D/g, "");
  if (digits.length === 10) {
    const match = digits.match(/^(\d{3})(\d{3})(\d{4})$/);
    event.target.setCustomValidity(match ? "" : "Enter a valid 10-digit phone number.");
  } else {
    event.target.setCustomValidity(digits.length === 0 ? "" : "Enter a 10-digit phone number, including area code.");
  }
});

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requestForm.reportValidity()) return;

  const data = new FormData(requestForm);
  requestText = [
    "WorkerBee request",
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Phone: ${data.get("phone") || "Not provided"}`,
    `Request: ${requestType.options[requestType.selectedIndex].text}`,
    `Details: ${data.get("details") || "None provided"}`,
  ].join("\n");
  document.querySelector(".request-preview").textContent = requestText;
  requestForm.hidden = true;
  dialogSuccess.hidden = false;
});

document.querySelector(".copy-request").addEventListener("click", async (event) => {
  const feedback = document.querySelector(".copy-feedback");
  try {
    await navigator.clipboard.writeText(requestText);
    feedback.textContent = "Copied. Your details are ready to share.";
    event.currentTarget.textContent = "Copied";
  } catch {
    feedback.textContent = "Clipboard access isn't available here. Select and copy your request details from the browser form before closing.";
    showToast("Clipboard access is unavailable in this browser.");
  }
});

document.querySelectorAll(".heart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const isSaved = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isSaved));
    button.textContent = isSaved ? "♡" : "♥";
    showToast(isSaved ? "Removed from your saved gear." : "Saved for your next visit.");
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

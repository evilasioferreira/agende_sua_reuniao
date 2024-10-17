const participants = [];

document.getElementById("continue-button").addEventListener("click", goToForm);
document
  .getElementById("add-participant-button")
  .addEventListener("click", addParticipant);
document
  .getElementById("confirm-button")
  .addEventListener("click", confirmMeeting);
document
  .getElementById("back-button")
  .addEventListener("click", goBackToCalendar);
document
  .getElementById("cancel-button")
  .addEventListener("click", cancelMeeting);
document
  .getElementById("reschedule-button")
  .addEventListener("click", rescheduleMeeting);

function goToForm() {
  const date = document.getElementById("selected-date").value;
  const time = document.getElementById("selected-time").value;

  if (!date || !time) {
    alert("Por favor, selecione uma data e horário.");
    return;
  }

  document.getElementById("calendar-screen").classList.add("hidden");
  document.getElementById("form-screen").classList.remove("hidden");
}

function addParticipant() {
  const participantName = document.getElementById("participant-name").value;
  const participantEmail = document.getElementById("participant-email").value;

  if (!participantName || !participantEmail) {
    alert("Por favor, insira um nome e um e-mail válidos.");
    return;
  }

  participants.push({ name: participantName, email: participantEmail });
  updateParticipantsList();

  document.getElementById("participant-name").value = "";
  document.getElementById("participant-email").value = "";
}

function updateParticipantsList() {
  const participantsList = document.getElementById("participants-list");
  participantsList.innerHTML = "";

  participants.forEach((participant) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${participant.name} (${participant.email})`;
    participantsList.appendChild(listItem);
  });
}

function confirmMeeting() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const observations = document.getElementById("observations").value;
  const date = document.getElementById("selected-date").value;
  const time = document.getElementById("selected-time").value;

  if (!name || !email) {
    alert("Por favor, preencha seu nome e e-mail.");
    return;
  }

  document.getElementById("confirm-date").innerText = date;
  document.getElementById("confirm-time").innerText = time;
  document.getElementById("confirm-name").innerText = name;
  document.getElementById("confirm-email").innerText = email;
  document.getElementById("confirm-obs").innerText = observations || "Nenhuma";

  const participantsText =
    participants.length > 0
      ? participants.map((p) => `${p.name} (${p.email})`).join(", ")
      : "Nenhum";
  document.getElementById("confirm-participants").innerText = participantsText;

  const meetLink = "https://meet.google.com/new";
  document.getElementById("meet-link").href = meetLink;

  document.getElementById("form-screen").classList.add("hidden");
  document.getElementById("confirmation-screen").classList.remove("hidden");
}

function cancelMeeting() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("observations").value = "";
  participants.length = 0;
  updateParticipantsList();

  document.getElementById("confirmation-screen").classList.add("hidden");
  document.getElementById("calendar-screen").classList.remove("hidden");
}

function rescheduleMeeting() {
  document.getElementById("confirmation-screen").classList.add("hidden");
  document.getElementById("calendar-screen").classList.remove("hidden");

  // Limpa os campos ao reprogramar
  document.getElementById("selected-date").value = "";
  document.getElementById("selected-time").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("observations").value = "";
  participants.length = 0;
  updateParticipantsList();
}

function goBackToCalendar() {
  document.getElementById("form-screen").classList.add("hidden");
  document.getElementById("calendar-screen").classList.remove("hidden");
}

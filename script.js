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

function removeParticipant(index) {
  participants.splice(index, 1); // Remove o participante da lista
  updateParticipantsList();
}

function updateParticipantsList() {
  const participantsList = document.getElementById("participants-list");
  participantsList.innerHTML = "";

  participants.forEach((participant, index) => {
    const listItem = document.createElement("li");
    listItem.style.display = "flex"; // Para alinhar o texto e o botão "x"
    listItem.style.justifyContent = "space-between"; // Nome à esquerda e "x" à direita
    listItem.style.alignItems = "center"; // Alinha verticalmente no centro

    // Texto do nome e e-mail
    const participantText = document.createElement("span");
    participantText.innerText = `${participant.name} (${participant.email})`;

    // Cria o botão "x" para remover participante
    const removeButton = document.createElement("span");
    removeButton.innerText = "x";
    removeButton.style.cursor = "pointer"; // Torna o "x" clicável
    removeButton.style.color = "red"; // Opcional: cor vermelha para o "x"
    removeButton.style.marginLeft = "10px"; // Pequeno espaço entre o nome e o "x"
    
    removeButton.addEventListener("click", () => removeParticipant(index));

    // Adiciona o texto e o botão "x" ao item da lista
    listItem.appendChild(participantText);
    listItem.appendChild(removeButton);

    // Adiciona o item da lista à lista de participantes
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

  // Chamada para o envio de e-mails de confirmação
  sendConfirmationEmail(name, email, date, time, participants);

  document.getElementById("form-screen").classList.add("hidden");
  document.getElementById("confirmation-screen").classList.remove("hidden");
}

// Função para enviar e-mail de confirmação (aqui deve haver integração com um backend)
function sendConfirmationEmail(name, email, date, time, participants) {
  const emailData = {
    subject: "Confirmação de Reunião",
    body: `Olá ${name}, sua reunião foi agendada para ${date} às ${time}. Os participantes são: ${participants.map(p => p.name).join(", ")}`,
    recipients: [email, ...participants.map(p => p.email)] // Envia para o organizador e para os participantes
  };

  fetch("/send-email", {  // Exemplo de rota de backend para envio de e-mails
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("E-mails de confirmação enviados com sucesso.");
      } else {
        alert("Falha ao enviar e-mails.");
      }
    })
    .catch((error) => {
      console.error("Erro ao enviar e-mails:", error);
    });
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


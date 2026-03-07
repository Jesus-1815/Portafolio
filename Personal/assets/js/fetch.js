document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: document.querySelector("input[name='Nombre']").value,
    email: document.querySelector("input[name='email']").value,
    subject: document.querySelector("input[name='subject']").value,
    message: document.querySelector("textarea[name='message']").value
  };

  const response = await fetch("https://TU_BACKEND.onrender.com/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if(result.success){
    alert("Mensaje enviado correctamente");
  } else {
    alert("Error al enviar");
  }
});
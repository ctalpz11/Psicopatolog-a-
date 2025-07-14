let categoriaActual = "";
let pacienteActual = null;

function mostrarMenu() {
  ocultarTodas();
  document.getElementById("pantalla-menu").classList.remove("oculto");
}

function volverInicio() {
  ocultarTodas();
  document.getElementById("pantalla-inicio").classList.remove("oculto");
}

function ocultarTodas() {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.add("oculto"));
}

const categorias = {
  "Trastornos del Estado del Ánimo": [
    {
      nombre: "Ana, 20 años – “Todo me da igual”",
      sintomas: [
        "Ánimo deprimido casi todo el día",
        "Anhedonia (no disfruta nada)",
        "Fatiga constante",
        "Ideas de inutilidad",
        "Insomnio de conciliación",
        "Pérdida de peso sin dieta"
      ],
      preguntas: [
        { pregunta: "¿Cuánto tiempo llevas sintiéndote así?", respuesta: "Unos dos meses, todos los días." },
        { pregunta: "¿Has tenido pensamientos de hacerte daño?", respuesta: "Sí, a veces pienso que no vale la pena vivir." },
        { pregunta: "¿Has tenido momentos en que te sientes súper feliz sin razón?", respuesta: "No, nada me alegra últimamente." }
      ],
      diagnosticos: [
        { texto: "Trastorno Depresivo Mayor", correcto: true },
        { texto: "Distimia", correcto: false },
        { texto: "Trastorno Adaptativo con estado de ánimo deprimido", correcto: false }
      ]
    }
    // Puedes añadir más pacientes aquí
  ]
};

let categoriaActual = null;
let pacienteActual = 0;

function mostrarMenu() {
  document.body.innerHTML = `
    <div class="menu">
      <h1>Simulador de Psicopatologías</h1>
      <p>Elige una categoría:</p>
      <ul>
        ${Object.keys(categorias).map(cat => `<li><button onclick="iniciarCategoria('${cat}')">${cat}</button></li>`).join("")}
      </ul>
    </div>
  `;
}

function iniciarCategoria(nombreCategoria) {
  categoriaActual = categorias[nombreCategoria];
  pacienteActual = 0;
  mostrarPaciente();
}

function mostrarPaciente() {
  const paciente = categoriaActual[pacienteActual];
  if (!paciente) {
    document.body.innerHTML = `<h2>¡Has terminado todos los pacientes de esta categoría!</h2><button onclick="mostrarMenu()">Volver al menú</button>`;
    return;
  }

  document.body.innerHTML = `
    <div class="caso">
      <h2>${paciente.nombre}</h2>
      <h3>Síntomas:</h3>
      <ul>${paciente.sintomas.map(s => `<li>${s}</li>`).join("")}</ul>
      <h3>Preguntas:</h3>
      <ul>${paciente.preguntas.map(p => `<li><strong>${p.pregunta}</strong><br><em>📣 ${p.respuesta}</em></li>`).join("")}</ul>
      <h3>Diagnóstico:</h3>
      <div class="diagnosticos">
        ${paciente.diagnosticos.map((d, i) => `<button onclick="verificarDiagnostico(${i})">${d.texto}</button>`).join("")}
      </div>
      <button onclick="mostrarMenu()">Volver al menú</button>
    </div>
  `;
}

function verificarDiagnostico(indice) {
  const diagnostico = categoriaActual[pacienteActual].diagnosticos[indice];
  const mensaje = diagnostico.correcto
    ? "✅ ¡Diagnóstico correcto! El paciente ha sido atendido exitosamente."
    : "❌ Diagnóstico incorrecto. El paciente se sintió incomprendido.";

  alert(mensaje);
  pacienteActual++;
  mostrarPaciente();
}

// Inicia el juego
mostrarMenu();

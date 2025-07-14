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

function cargarCategoria(cat) {
  categoriaActual = cat;
  cambiarPaciente();
  document.getElementById("pantalla-juego").classList.remove("oculto");
}

function cambiarPaciente() {
  const lista = pacientes[categoriaActual];
  pacienteActual = lista[Math.floor(Math.random() * lista.length)];
  mostrarPaciente();
}

function mostrarPaciente() {
  const info = document.getElementById("info-paciente");
  const contenido = document.getElementById("contenido");
  const opciones = document.getElementById("opciones");

  info.innerHTML = `
    <strong>Paciente:</strong> ${pacienteActual.nombre}, ${pacienteActual.edad} años<br>
    <strong>Antecedentes:</strong> ${pacienteActual.antecedentes}
    <br><strong>Síntomas:</strong><ul>${pacienteActual.sintomas.map(s => `<li>${s}</li>`).join("")}</ul>
  `;

  contenido.innerHTML = `<p>¿Qué pregunta clínica deseas hacer?</p>`;
  opciones.innerHTML = "";

  pacienteActual.preguntas_clave.forEach((p, i) => {
    const btn = document.createElement("button");
    btn.textContent = p.texto;
    btn.onclick = () => evaluarPregunta(p.correcta);
    opciones.appendChild(btn);
  });
}

function evaluarPregunta(correcta) {
  const contenido = document.getElementById("contenido");
  const opciones = document.getElementById("opciones");

  if (correcta) {
    contenido.innerHTML = `<p>✔️ Buena elección. ¿Cuál es el diagnóstico?</p>`;
    opciones.innerHTML = "";

    const opcionesDiag = [pacienteActual.diagnostico_correcto, ...pacienteActual.distractores];
    opcionesDiag.sort(() => Math.random() - 0.5);

    opcionesDiag.forEach(d => {
      const btn = document.createElement("button");
      btn.textContent = d;
      btn.onclick = () => evaluarDiagnostico(d);
      opciones.appendChild(btn);
    });
  } else {
    contenido.innerHTML = `<p>❌ Esa pregunta no ayudó. El caso se complica... intenta otra.</p>`;
  }
}

function evaluarDiagnostico(seleccionado) {
  const contenido = document.getElementById("contenido");
  const opciones = document.getElementById("opciones");

  if (seleccionado === pacienteActual.diagnostico_correcto) {
    contenido.innerHTML = `<p>🎉 ¡Correcto! Has diagnosticado con éxito a ${pacienteActual.nombre}.</p>`;
  } else {
    contenido.innerHTML = `<p>💔 ${pacienteActual.nombre} se sintió incomprendida. Era: <strong>${pacienteActual.diagnostico_correcto}</strong>.</p>`;
  }

  opciones.innerHTML = `
    <button onclick="cambiarPaciente()">🔄 Otro paciente</button>
    <button onclick="mostrarMenu()">🏠 Menú</button>
  `;
}

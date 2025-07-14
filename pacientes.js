const pacientes = {
  estado_animo: [
    {
      nombre: "María G.",
      edad: 22,
      antecedentes: "Estudiante universitaria. Vive sola. Refiere sentirse cansada desde hace meses.",
      sintomas: [
        "Ánimo deprimido casi todo el día",
        "Anhedonia",
        "Alteraciones en el sueño",
        "Fatiga",
        "Dificultad para concentrarse"
      ],
      preguntas_clave: [
        {
          texto: "¿Desde hace cuánto tiempo se siente así?",
          correcta: true
        },
        {
          texto: "¿Ha tenido fiebre recientemente?",
          correcta: false
        },
        {
          texto: "¿Ha tenido problemas con la ley?",
          correcta: false
        }
      ],
      diagnostico_correcto: "Episodio Depresivo Mayor",
      distractores: ["Trastorno Bipolar", "Distimia"]
    }
  ]
};

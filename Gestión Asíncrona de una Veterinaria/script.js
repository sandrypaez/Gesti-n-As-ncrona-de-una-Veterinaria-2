let dueños = [], mascotas = [];
function menu() {
  let op = prompt(
    "1. Registrar dueño\n" +
    "2. Registrar mascota\n" +
    "3. Ver mascotas registradas\n" +
    "4. Buscar mascota\n" +
    "5. Ver mascotas por dueño\n" +
    "6. Salir"
  );
  switch (op) {
    case "1": registrarDueño(); break;
    case "2": registrarMascota(); break;
    case "3": verMascotas(); break;
    case "4": buscarMascota(); break;
    case "5": mascotasPorDueño(); break;
    case "6": return alert("Gracias por usar el sistema. ¡Hasta luego!");
    default: alert("Opción no válida");
  }
  menu();
}
function registrarDueño() {
  let nombre = prompt("Nombre del dueño:");
  let cedula = prompt("Cédula:");
  if (!nombre || !cedula) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  dueños.push({ id: dueños.length + 1, nombre, cedula });
  alert("Dueño registrado con éxito.");
}
function registrarMascota() {
  let nombre = prompt("Nombre de la mascota:");
  let especie = prompt("Especie:");
  let edad = Number(prompt("Edad (en años):"));
  let peso = Number(prompt("Peso (kg):"));
  let estado = prompt("Estado de salud (Sano, Enfermo, En tratamiento):");
  let cedula = prompt("Cédula del dueño:");
  let dueño = dueños.find(d => d.cedula === cedula);
  if (!nombre || !especie || !estado || !dueño || edad < 0 || peso < 0) {
    alert("Datos inválidos o dueño no existe.");
    return;
  }
  mascotas.push({
    id: mascotas.length + 1,
    nombre,
    especie,
    edad,
    peso,
    estado,
    dueñoId: dueño.id
  });
  alert("Mascota registrada con éxito.");
}
function verMascotas() {
  if (mascotas.length === 0) {
    alert("No hay mascotas registradas.");
    return;
  }
  let mensaje = " MASCOTAS REGISTRADAS:\n\n";
  mascotas.forEach(m => {
    let dueño = dueños.find(d => d.id === m.dueñoId);
    mensaje += `- ${m.nombre} (${m.especie})\n  Edad: ${m.edad} años\n  Estado: ${m.estado}\n  Dueño: ${dueño?.nombre}\n\n`;
  });

  alert(mensaje);
}
function buscarMascota() {
  let nombre = prompt("Nombre de la mascota:");
  let mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());

  if (mascota) {
    let dueño = dueños.find(d => d.id === mascota.dueñoId);
    alert(`Mascota: ${mascota.nombre}\nEspecie: ${mascota.especie}\nEstado: ${mascota.estado}\nDueño: ${dueño.nombre}`);
  } else {
    alert("Mascota no encontrada.");
  }
}
function mascotasPorDueño() {
  let cedula = prompt("Cédula del dueño:");
  let dueño = dueños.find(d => d.cedula === cedula);
  if (!dueño) {
    alert("Dueño no encontrado.");
    return;
  }
  let lista = mascotas.filter(m => m.dueñoId === dueño.id);
  if (lista.length === 0) {
    alert("Este dueño no tiene mascotas registradas.");
    return;
  }
  let mensaje = `Mascotas de ${dueño.nombre}:\n\n`;
  lista.forEach(m => {
    mensaje += `- ${m.nombre} (${m.especie}) - Estado: ${m.estado}\n`;
  });
  alert(mensaje);
}
menu();

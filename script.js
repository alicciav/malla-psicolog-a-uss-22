// Cargar cursos aprobados del navegador
let approvedCourses = JSON.parse(localStorage.getItem("approvedCourses")) || [];

// Al cargar la página, actualizar estado de todos los cursos
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".course").forEach(course => {
    const id = course.dataset.id;
    const prereq = course.dataset.prereq ? course.dataset.prereq.split(",") : [];

    // Si el curso está aprobado
    if (approvedCourses.includes(id)) {
      course.classList.add("approved");
      course.classList.remove("locked");
    }

    // Revisar prerrequisitos
    if (prereq.length > 0 && !prereq.every(pr => approvedCourses.includes(pr))) {
      course.classList.add("locked");
    } else {
      course.classList.remove("locked");
    }
  });
});

// Mostrar u ocultar información
function toggleInfo(element) {
  const info = element.querySelector(".course-info");
  info.style.display = info.style.display === "block" ? "none" : "block";
}

// Al hacer clic en un curso
function handleCourseClick(element) {
  const id = element.dataset.id;
  const prereq = element.dataset.prereq ? element.dataset.prereq.split(",") : [];

  // Si está bloqueado, no hacer nada
  if (element.classList.contains("locked")) {
    alert("No puedes marcar este curso porque no cumples los prerrequisitos.");
    return;
  }

  // Marcar o desmarcar como aprobado
  if (approvedCourses.includes(id)) {
    approvedCourses = approvedCourses.filter(c => c !== id);
    element.classList.remove("approved");
  } else {
    approvedCourses.push(id);
    element.classList.add("approved");
  }

  // Guardar en LocalStorage
  localStorage.setItem("approvedCourses", JSON.stringify(approvedCourses));

  // Revisar todos los cursos y actualizar bloqueo
  document.querySelectorAll(".course").forEach(course => {
    const cid = course.dataset.id;
    const cprereq = course.dataset.prereq ? course.dataset.prereq.split(",") : [];

    if (cprereq.length > 0 && !cprereq.every(pr => approvedCourses.includes(pr))) {
      course.classList.add("locked");
    } else {
      course.classList.remove("locked");
    }
  });
} // ESTA llave cierra handleCourseClick()

function resetProgress() {
  if (confirm("¿Estás seguro de que deseas reiniciar todo el progreso?")) {
    localStorage.removeItem("approvedCourses");
    location.reload();
  }
}

// Cargar cursos aprobados
let approvedCourses = JSON.parse(localStorage.getItem("approvedCourses")) || [];

// Al cargar, actualizar estado
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".course").forEach(course => {
    const id = course.dataset.id;
    const prereq = course.dataset.prereq ? course.dataset.prereq.split(",") : [];

    if (approvedCourses.includes(id)) {
      course.classList.add("approved");
      course.classList.remove("locked");
    }

    if (prereq.length > 0 && !prereq.every(pr => approvedCourses.includes(pr))) {
      course.classList.add("locked");
    } else {
      course.classList.remove("locked");
    }
  });
});

// Toggle info
function toggleInfo(element) {
  const info = element.querySelector(".course-info");
  info.style.display = info.style.display === "block" ? "none" : "block";
}

// Click en curso
function handleCourseClick(element) {
  const id = element.dataset.id;
  const prereq = element.dataset.prereq ? element.dataset.prereq.split(",") : [];

  if (element.classList.contains("locked")) {
    alert("No puedes marcar este curso porque no cumples los prerrequisitos.");
    return;
  }

  if (approvedCourses.includes(id)) {
    approvedCourses = approvedCourses.filter(c => c !== id);
    element.classList.remove("approved");
  } else {
    approvedCourses.push(id);
    element.classList.add("approved");
  }

  localStorage.setItem("approvedCourses", JSON.stringify(approvedCourses));

  // Actualizar bloqueo
  document.querySelectorAll(".course").forEach(course => {
    const cid = course.dataset.id;
    const cprereq = course.dataset.prereq ? course.dataset.prereq.split(",") : [];

    if (cprereq.length > 0 && !cprereq.every(pr => approvedCourses.includes(pr))) {
      course.classList.add("locked");
    } else {
      course.classList.remove("locked");
    }
  });
}

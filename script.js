function toggleInfo(element) {
  const info = element.querySelector('.course-info');
  if (info.style.display === 'block') {
    info.style.display = 'none';
  } else {
    info.style.display = 'block';
  }
}

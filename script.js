const studentList = document.getElementById('studentList');
const form = document.getElementById('studentForm');
const searchInput = document.getElementById('search');
const toggleModeBtn = document.getElementById('toggleMode');
let students = [];

// ✅ Fetch sample students from a free API
fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(data => {
    students = data.slice(0, 5).map(user => ({
      name: user.name,
      email: user.email,
      phone: user.phone
    }));
    renderStudents(students);
  });

// ✅ Render function
function renderStudents(list) {
  studentList.innerHTML = '';
  list.forEach(student => {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
      <h3>${student.name}</h3>
      <p>Email: ${student.email}</p>
      <p>Phone: ${student.phone}</p>
    `;
    studentList.appendChild(card);
  });
}

// ✅ Add new student (frontend only)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newStudent = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };
  students.push(newStudent);
  renderStudents(students);
  form.reset();
  alert(`${newStudent.name} has been registered successfully!`);
});

// ✅ Search filter
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm)
  );
  renderStudents(filtered);
});

// ✅ Dark mode toggle
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleModeBtn.textContent = 
    document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});
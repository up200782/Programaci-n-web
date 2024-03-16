document.addEventListener('DOMContentLoaded', function () {
  const usersSelect = document.getElementById('usersSelect');
  const userInfo = document.getElementById('userInfo');
  const toggleTasksBtn = document.getElementById('toggleTasksBtn');
  const userTasks = document.getElementById('userTasks');

  // Cargar usuarios al seleccionar el archivo JSON correspondiente
  fetch('usuarios.json')
      .then(response => response.json())
      .then(data => {
          data.forEach(user => {
              const option = document.createElement('option');
              option.value = user.id;
              option.textContent = user.firstname + ' ' + user.lastname;
              usersSelect.appendChild(option);
          });
      });

  // Mostrar información del usuario seleccionado
  usersSelect.addEventListener('change', function () {
      const userId = this.value;
      fetch('usuarios.json')
          .then(response => response.json())
          .then(data => {
              const selectedUser = data.find(user => user.id == userId);
              if (selectedUser) {
                  userInfo.innerHTML = `
                      <p>ID: ${selectedUser.id}</p>
                      <p>Nombre: ${selectedUser.firstname} ${selectedUser.lastname}</p>
                      <p>Correo: ${selectedUser.email}</p>
                  `;
              } else {
                  userInfo.innerHTML = 'Usuario no encontrado';
              }
          });
  });

  // Mostrar u ocultar tareas del usuario
  toggleTasksBtn.addEventListener('click', function () {
      if (userTasks.style.display === 'none') {
          userTasks.style.display = 'block';
          this.textContent = 'Ocultar Tareas';
          fetch('tareas.json')
              .then(response => response.json())
              .then(data => {
                  userTasks.innerHTML = '<h2>Tareas del usuario:</h2>';
                  data.forEach(task => {
                      const taskInfo = document.createElement('p');
                      taskInfo.textContent = task.task;
                      userTasks.appendChild(taskInfo);
                  });
              });
      } else {
          userTasks.style.display = 'none';
          this.textContent = 'Mostrar Tareas';
          userTasks.innerHTML = '';
      }
  });
});

// Certifique-se de declarar a variável userData
const userData = [];

function submitForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const nif = document.getElementById('nif').value;
  const birthdateString = document.getElementById('birthdate').value;
  const nacionalidade = document.getElementById('nationality').value;
  const phoneNumber = document.getElementById('phone').value;
  const postalCode = document.getElementById('postalCode').value;
  const address = document.getElementById('address').value;

  // Formatando a string da data para o formato "YYYY-MM-DD"
  const birthdateObj = new Date(birthdateString.split('-').reverse().join('-'));

  const emailExists = userData.some(user => user.email === email);

  const isNifValid = /^\d{9}$/.test(nif);
  const isPhoneNumberValid = /^\d{9}$/.test(phoneNumber);
  const isPostalCodeValid = /^\d{4}-\d{3}$/.test(postalCode);

  const isOver18 = new Date().getFullYear() - birthdateObj.getFullYear() > 18;

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Verificações adicionais para a data de nascimento
  const isValidDate = !isNaN(birthdateObj.getTime()); // Verifica se a data é válida
  const isBirthdayPassed = new Date().getTime() >= new Date(new Date().getFullYear(), birthdateObj.getMonth(), birthdateObj.getDate()).getTime(); // Verifica se o aniversário já ocorreu este ano

  if (name && email && password && nif && birthdateString && nacionalidade && phoneNumber && postalCode) {
    if (emailExists) {
      alert('Este e-mail já está em uso. Por favor, escolha outro.');
    } else if (!isNifValid) {
      alert('O NIF deve ter exatamente 9 números.');
    } else if (!isOver18) {
      alert('Você deve ter pelo menos 18 anos para se registrar.');
    } else if (!isPhoneNumberValid) {
      alert('O número de telefone deve ter exatamente 9 números.');
    } else if (!isPostalCodeValid) {
      alert('O Código Postal deve seguir o formato 1234-123.');
    } else if (!isEmailValid) {
      alert('Por favor, insira um endereço de e-mail válido.');
    } else if (!address) {
      alert('Por favor, insira a morada.');
    } else if (!isValidDate) {
      alert('Por favor, insira uma data de nascimento válida.');
    } else if (!isBirthdayPassed) {
      alert('A data de nascimento deve ser anterior ao dia de hoje.');
    } else {
      const user = { name, email, password, nif, birthdate: birthdateString, nacionalidade, phoneNumber, postalCode };
      userData.push(user);

      // Adicionando uma mensagem de sucesso
      alert('Registro bem-sucedido!');

      localStorage.setItem('userData', JSON.stringify(userData));

      document.getElementById('user-form').reset();
      updateUserDataList();
      document.getElementById('user-list').style.display = 'block';
    }
  } else {
    alert('Por favor, preencha todos os campos obrigatórios.');
  }
}

function login() {
  const loginEmail = document.getElementById('login-email').value;
  const loginPassword = document.getElementById('login-password').value;

  const userFound = userData.find(user => user.email === loginEmail && user.password === loginPassword);

  if (userFound) {
    alert('Login bem-sucedido!');
    window.location.href = 'Principalinico.html';
  } else {
    alert('Credenciais inválidas. Tente novamente.');
  }
}

function updateUserDataList() {
  const userListElement = document.getElementById('user-data');
  userListElement.innerHTML = '';

  userData.forEach(user => {
    const listItem = document.createElement('li');
    listItem.textContent = `Nome: ${user.name}, E-mail: ${user.email}, Senha: ${user.password}`;
    userListElement.appendChild(listItem);
  });
}

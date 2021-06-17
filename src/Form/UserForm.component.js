const UserFormComponent = () => {
  const form = document.createElement('form');
  form.setAttribute('class', 'form');

  const username = document.createElement('input');
  username.setAttribute('class', 'username');
  username.setAttribute('name', 'name');
  username.setAttribute('placeholder', 'Enter your Name');

  form.appendChild(username);
  return form;
};

export default UserFormComponent;
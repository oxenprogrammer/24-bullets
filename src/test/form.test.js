/**
 * @jest-environment jsdom
 */

import UserFormComponent from '../Form/UserForm.component';

describe('User Form Component', () => {
  const userFormCompoent = UserFormComponent();
  it('should create a form', () => {
    expect(userFormCompoent.tagName).toBe('FORM');
  });

  it('should have a name input', () => {
    document.body.appendChild(userFormCompoent);
    const nameInput = document.querySelector('[name = "name"]');
    expect(nameInput.tagName).toBe('INPUT');
  });

  it('should not create a div', () => {
    expect(userFormCompoent.tagName).not.toBe('DIV');
  });

  it('should not have its own submit button', () => {
    document.body.appendChild(userFormCompoent);
    const nameInput = document.querySelector('[type = "submit"]');
    expect(nameInput).toBe(null);
  });
});
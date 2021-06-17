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
});
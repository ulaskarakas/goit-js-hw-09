const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

const saveFormState = () => {
  const state = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const populateForm = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    if (parsed.email) form.elements.email.value = parsed.email;
    if (parsed.message) form.elements.message.value = parsed.message;
  } catch (error) {
    console.warn('Saved feedback state is invalid:', error);
  }
};

const clearFormState = () => {
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
};

form.addEventListener('input', event => {
  if (event.target.name !== 'email' && event.target.name !== 'message') {
    return;
  }
  saveFormState();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const submittedData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  if (!submittedData.email || !submittedData.message) {
    console.warn('Email or message cannot be empty');
    return;
  }

  console.log(submittedData);
  clearFormState();
});

populateForm();

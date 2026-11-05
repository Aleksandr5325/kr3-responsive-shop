// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле, в которое будет записан выбранный товар.
const selectedProductInput = document.getElementById('selected-product');

// Перебираем все кнопки «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Получаем название товара из data-атрибута.
    const productName = button.dataset.product;

    // Записываем название товара в скрытое поле формы.
    selectedProductInput.value = productName;

    // Открываем модальное окно.
    successMessage.hidden = true;
    orderDialog.showModal();
  });
});

// Закрываем модальное окно по кнопке «Закрыть».
closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});

// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Для каждого поля создаём текст ошибки и связываем его с полем.
const fields = Array.from(orderForm.querySelectorAll('input, select, textarea')).filter((field) => field.willValidate);
const errors = new Map();
fields.forEach((field) => {
  const error = document.createElement('small');
  error.className = 'order-form__error';
  error.id = `${field.id}-error`;
  error.hidden = true;
  field.closest('.order-form__field').append(error);
  const descriptions = field.getAttribute('aria-describedby');
  field.setAttribute('aria-describedby', [descriptions, error.id].filter(Boolean).join(' '));
  errors.set(field, error);
  field.addEventListener('input', () => {
    if (field.validity.valid) {
      field.removeAttribute('aria-invalid');
      error.hidden = true;
    }
  });
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Учебный проект: сервер не подключён.
  let firstInvalid = null;
  fields.forEach((field) => {
    const error = errors.get(field);
    if (field.validity.valid) {
      field.removeAttribute('aria-invalid');
      error.hidden = true;
    } else {
      field.setAttribute('aria-invalid', 'true');
      error.textContent = field.validationMessage;
      error.hidden = false;
      firstInvalid ??= field;
    }
  });
  if (firstInvalid) {
    firstInvalid.focus(); // Диктор прочитает подпись и связанное пояснение.
    return;
  }
  orderDialog.close();
  successMessage.hidden = false;
  orderForm.reset();
});

const taggedTemplate = (texts, ...values) =>
  texts.map((text, index) =>
    `${text.trim() !== '' ? `<em>${text}</em>` : `${text}`}${values[index] ? `<strong>${values[index]}</strong>` : ''}`).join('');

export default taggedTemplate;

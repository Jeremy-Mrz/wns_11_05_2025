export function basicFormValidation(form: { [key: string]: FormDataEntryValue }, requiredFields: string[]) {
  const missingFields = [];
  for (const requiredField of requiredFields) {
    if (!form[requiredField] || form[requiredField] === undefined) missingFields.push(requiredField);
  }
  return missingFields;
}
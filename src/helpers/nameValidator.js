export function nameValidator(name, error) {
  if (!name) {
    return error || "Name can't be empty.";
  }
  return '';
}

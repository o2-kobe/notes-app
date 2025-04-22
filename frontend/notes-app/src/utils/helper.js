export function validateEmail(email) {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
}

export const getInitials = (name) => {
  if (!name) return "";

  const initials = name
    .split(" ")
    .map((word) => word.slice(0, 1))
    .join("")
    .toUpperCase();
  return initials;
};

export const initialsToUpper = (name) => {
  if (!name) return "";

  return name
    .split(" ")
    .map((name) => name.replace(name[0], name[0].toUpperCase()))
    .join(" ");
};

export const rangeValidator = (
  value: string | number,
  min: number,
  max: number
) => {
  try {
    const parsed = typeof value === "string" ? parseInt(value) : value;
    if (parsed >= min && parsed <= max) return true;
    return false;
  } catch (err) {
    return false;
  }
};

export const minuteValidator = (value: string | number) => {
  return rangeValidator(value, 0, 59);
};

export const hourValidator = (value: string | number) => {
  return rangeValidator(value, 0, 24);
};

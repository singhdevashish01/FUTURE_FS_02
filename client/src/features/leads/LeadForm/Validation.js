export function validateLead(formData) {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "Name is required.";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }
  }

  if (!formData.phone?.trim()) {
    errors.phone = "Phone number is required.";
  }

  if (!formData.company?.trim()) {
    errors.company = "Company is required.";
  }

  if (
    formData.probability < 0 ||
    formData.probability > 100
  ) {
    errors.probability =
      "Probability must be between 0 and 100.";
  }

  if (formData.estimatedValue < 0) {
    errors.estimatedValue =
      "Estimated value cannot be negative.";
  }

  return errors;
}
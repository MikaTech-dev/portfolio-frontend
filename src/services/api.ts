interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  website?: string;
  recipient?: string;
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}
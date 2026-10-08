export const filterFalseValues = obj => {
  const params = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === false || value == null || value === '') {
      continue;
    }

    if (key === 'location') {
      const city = value.trim().split(',')[0].trim();

      if (city !== '') {
        params.location = city;
      }
    } else if (key === 'transmission' && value === true) {
      params.transmission = 'automatic';
    } else {
      params[key] = value;
    }
  }

  return params;
};

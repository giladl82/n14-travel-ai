export type Country = {
  country: string;
  iso2: string;
  iso3: string;
  cities: string[];
};

let countries: Country[] | null = null;

export const loadCountries = async () => {
  if (countries) {
    return countries;
  }

  const response = await fetch('https://countriesnow.space/api/v0.1/countries');
  const json = await response.json();

  if (json.error) {
    throw new Error(json.error);
  }

  countries = json.data;
  return countries;
};

export interface ICountrySelectProps {
  country?: string;
  handleCountryChange: (value: string) => void;
  filterOptions: (value: string) => void;
  filteredCountries: { value: string; label: string }[];
  isRequired: boolean;
}

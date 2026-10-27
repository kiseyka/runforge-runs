import styles from "./SearchInput.module.css";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="search"
      className={styles.input}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search by name or repository"
      aria-label="Search runs by name or repository"
    />
  );
}

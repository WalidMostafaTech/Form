const OptionSelector = ({
  options = [],
  selected,
  onSelect,
  getLabel = (item) => item.name,
  getValue = (item) => item.id,
  className = "",
}) => {
  return (
    <ul className={`flex items-center flex-wrap gap-2 ${className}`}>
      {options?.map((item, index) => {
        const value = getValue(item);

        return (
          <li key={value || index}>
            <button
              className={`text-sm px-4 py-1 cursor-pointer rounded border transition capitalize ${
                selected === value
                  ? "bg-primary text-white"
                  : "bg-primary-foreground hover:bg-primary/10"
              }`}
              onClick={() => onSelect(item)}
            >
              {getLabel(item)}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default OptionSelector;

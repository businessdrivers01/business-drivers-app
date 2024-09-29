import { useField } from 'formik';

export const FormSelect = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label htmlFor={props.id || props.name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        className={`w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange ${
          meta.touched && meta.error ? 'border-red-500' : ''
        }`}
        {...field}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs italic">{meta.error}</div>
      ) : null}
    </div>
  );
};
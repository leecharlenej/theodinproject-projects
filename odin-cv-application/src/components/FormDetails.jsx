function FormInput({ name, label, type, value, onChange, placeholder }) {
  return (
    <div className="form-input">
      <label htmlFor={name}>{label}: </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

function FormDetails({ formDetails, handleChange }) {
  return (
    <>
      <h2>General information</h2>
      <FormInput
        name="firstname"
        label="First name"
        type="text"
        value={formDetails.firstname}
        onChange={handleChange}
        placeholder="Enter your first name"
      />
      <FormInput
        name="lastname"
        label="Last name"
        type="text"
        value={formDetails.lastname}
        onChange={handleChange}
        placeholder="Enter your last name"
      />
      {/* Add other inputs as needed */}
    </>
  );
}

export default FormDetails;

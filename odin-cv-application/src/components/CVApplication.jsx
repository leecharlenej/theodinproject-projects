import "../styles/cvapplication.css";

function CVApplication({ formDetails }) {
  return (
    <div className="cv-main">
      <div id="general">
        <h3>{formDetails.firstname + " " + formDetails.lastname}</h3>
        <span id="phone-no">{formDetails.phoneNo}</span> |
        <span id="email">{formDetails.email}</span>
        <br />
        <span id="bio">{formDetails.bio}</span>
        <hr />
      </div>
    </div>
  );
}

export default CVApplication;

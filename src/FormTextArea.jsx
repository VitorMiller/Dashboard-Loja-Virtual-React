const FormTextArea = ( { field, onChange, label, value, error, autofocus = false}) => {
  return (
    <>
        <div className="form-floating">
            <textarea  className={`form-control ${error ?'is-invalid': 'is-valid'}`} placeholder=" " id={field} name={field} onChange={onChange} autoFocus={autofocus} style={{height:'7rem'}} value={value || ""} ></textarea>
            <label htmlFor={field}>{label}</label>
        </div>
        {error && <div className="invalid-feedback">{error}</div>}
      
    </>
  )
}

export default FormTextArea;

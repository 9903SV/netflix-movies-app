import './index.css'

interface InputPropsType {
    labelText: string; /* eslint-disable-line */
    showErrorMsg: boolean; /* eslint-disable-line */
    inputChanged: any; /* eslint-disable-line */
    inputBlurred: any; /* eslint-disable-line */
    inputType: string; /* eslint-disable-line */
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const InputComponent = (props: InputPropsType) => {
  const {labelText, showErrorMsg, inputChanged, inputBlurred, inputType} = props
  return (
    <div className="signin-labelinput-container">
      <label className="signin-label" htmlFor="signin-label">
        {labelText}
      </label>
      <input
        onChange={inputChanged}
        className="signin-input"
        type={inputType}
        id={labelText}
        onBlur={inputBlurred}
      />
      {showErrorMsg && <p className="signin-error-msg">*Required</p>}
    </div>
  )
}

export default InputComponent

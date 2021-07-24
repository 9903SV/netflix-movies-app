import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import './index.css'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PaginationButton = (props: {
  /* eslint-disable */
  moveBackPage: Function, 
  moveForwardPage: Function,
  pageNumber: number
}) => {
  const {moveBackPage, moveForwardPage, pageNumber} = props

  const backButtonClicked = () => {
    moveBackPage()
  }

  const forwardButtonClicked = () => {
    moveForwardPage()
  }

  return (
    <div className="pagination-buttons-container" style={{backgroundColor: '#000000'}}>
      <IoIosArrowBack
        className="pagination-button pagination-back-button"
        onClick={backButtonClicked}
      />
      <span>{pageNumber} of 20</span>
      <IoIosArrowForward
        className="pagination-button pagination-forward-button"
        onClick={forwardButtonClicked}
      />
    </div>
  )
}

export default PaginationButton

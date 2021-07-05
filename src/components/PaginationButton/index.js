import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import './index.css'

const PaginationButton = props => {
  const {moveBackPage, moveForwardPage, pageNumber} = props

  const backButtonClicked = () => {
    moveBackPage()
  }

  const forwardButtonClicked = () => {
    moveForwardPage()
  }

  return (
    <div className="pagination-buttons-container">
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

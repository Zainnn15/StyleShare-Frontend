/* eslint-disable react/prop-types */
import '../../styles/main.scss'
import { useEffect, useState } from 'react'
import {
  addErrorMessageByID,
  checkOnID,
  selectID,
  validate,
  validatePage,
} from '../../constants/functions/inputHandlers'

const GarmentDetails_p1 = ({
  formData,
  setFormData,
  page,
  numPages,
  handleForward,
  handleBack,
}) => {
  const [maxDate, setMaxDate] = useState('')

  useEffect(() => {
    // Get today's date in the format yyyy-mm-dd
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
    const year = today.getFullYear()
    setMaxDate(`${year}-${month}-${day}`)
  }, [])

  //handle next button
  function validateAndNext() {
    let querySelect = "input[type='text'],input[type='date']"
    let radioObj = [
      { name: 'purchaseMethod', check: formData['purchaseMethod'] },
    ]
    if (!validatePage(querySelect, radioObj)) {
      return false
    }
    if (!validateDate()) {
      return false
    }

    handleForward()
    return true
  }

  // Cannot have a purchase date in the future
  function validateDate() {
    const today = new Date()
    const purchaseDate = new Date(formData.purchaseDate)

    if (purchaseDate > today) {
      addErrorMessageByID(
        'purchaseDate_error',
        'Purchase date cannot be in the future',
      )
      return false
    }

    return true
  }

  return (
    <div>
      <div>
        <div
          className="container-prompt"
          onClick={() => selectID('purchaseLocation')}
        >
          <p>Name of retailer</p>
        </div>
        <div
          id={'purchaseLocation_error'}
          style={{ textAlign: 'center' }}
        ></div>
        <div className="container-input">
          <input
            type="text"
            id="purchaseLocation"
            name="purchaseLocation"
            placeholder="Enter store name"
            value={formData.purchaseLocation}
            onChange={(e) => {
              setFormData({
                ...formData,
                purchaseLocation: e.target.value,
              })
              validate('purchaseLocation')
            }}
            required
          />
        </div>
      </div>

      <div>
        <div className="container-prompt">
          <p>How was it purchased?</p>
        </div>
        <div id={'purchaseMethod_error'} style={{ textAlign: 'center' }}></div>
        <div className="container-radio">
          <div className="container-radio-group">
            <input
              type="radio"
              id="method_online"
              name="purchaseMethod"
              value={'online'}
              onClick={(e) => {
                setFormData({
                  ...formData,
                  purchaseMethod: e.target.id,
                })
                addErrorMessageByID('purchaseMethod_error', null)
              }}
              defaultChecked={checkOnID(
                'method_online',
                formData.purchaseMethod,
              )}
            />
            <label htmlFor="method_online">Online</label>
          </div>
          <div className="container-radio-group">
            <input
              type="radio"
              id="method_store"
              name="purchaseMethod"
              value={'store'}
              onClick={(e) => {
                setFormData({
                  ...formData,
                  purchaseMethod: e.target.id,
                })
                addErrorMessageByID('purchaseMethod_error', null)
              }}
              defaultChecked={checkOnID(
                'method_store',
                formData.purchaseMethod,
              )}
            />
            <label htmlFor="method_store">Brick & Mortar Store</label>
          </div>
        </div>
      </div>

      <div>
        <div
          className="container-prompt"
          onClick={() => selectID('purchaseDate')}
        >
          <p>When was it purchased? (dd/mm/yyyy)</p>
        </div>
        <div id={'purchaseDate_error'} style={{ textAlign: 'center' }}></div>
        <div className="container-input">
          <input
            type="date"
            id="purchaseDate"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={(e) => {
              setFormData({
                ...formData,
                purchaseDate: e.target.value,
              })
              validate('purchaseDate')
            }}
            required
            max={maxDate} // Setting the max attribute to the current date
          />
        </div>
      </div>
      <div className="container-button-form">
        {page > 0 && (
          <button type="button" className="button-form" onClick={handleBack}>
            Back
          </button>
        )}
        <button
          className="button-form"
          onClick={validateAndNext}
          type={page + 1 < numPages ? 'button' : 'submit'}
        >
          {page + 1 < numPages ? 'Next' : 'Submit'}
        </button>
      </div>
    </div>
  )
}

export default GarmentDetails_p1

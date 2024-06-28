/* eslint-disable react/prop-types */
import '../../styles/main.scss'
import {
  checkOnID,
  selectID,
  addErrorMessageByID,
  addErrorMessage,
  validateInpName,
} from '../../constants/functions/inputHandlers'
import { COUNTRIES } from '../../constants/data/options'

const GarmentDetails_p3 = ({
  formData,
  setFormData,
  page,
  numPages,
  handleForward,
  handleBack,
}) => {
  const options = COUNTRIES

  // validation
  function validate(fieldType, idName, toIdName) {
    let e_inp = document.getElementById(idName)
    if (!e_inp) {
      return false
    }
    let e_to = e_inp
    if (toIdName) {
      e_to = document.getElementById(toIdName)
      if (!e_to) {
        return
      }
    }

    let val = e_inp.value.trim().toLowerCase()
    if (val.length === 0) {
      addErrorMessage(e_to.id + '_error', 'Must not be empty')
      return false
    }

    let errMessage = ''
    let pattern = /^[0-9]+([.][0-9]{1,2})?$/
    switch (fieldType) {
      case 'price':
        if (pattern.test(val) && val >= 0) {
          // remove error message if any
          addErrorMessage(e_to.id + '_error', null)
          return true
        }
        errMessage = 'Must be a valid price'
        break
      case 'price_comparison':
        let discountedPrice = parseFloat(
          document.getElementById('garmentCost').value,
        )
        let originalPrice = parseFloat(
          document.getElementById('garmentOgCost').value,
        )
        if (originalPrice > discountedPrice) {
          // remove error message if any
          addErrorMessage(e_to.id + '_error', null)
          return true
        }
        errMessage = 'Original price must be greater than the discounted price'
        break
      default:
        for (let i = 0; i < options.length; i++) {
          if (options[i].label.toLowerCase() === val) {
            // remove error message if any
            addErrorMessage(e_to.id + '_error', null)
            return true
          }
        }
        errMessage = 'Must be a valid option in the list'
    }

    // add error message
    addErrorMessage(e_to.id + '_error', errMessage)
    return false
  }

  // handle next button
  function validateAndNext() {
    let isValid = true
    // validate page
    isValid = validate('country', 'garmentCountry') && isValid
    isValid = validate('price', 'garmentCost') && isValid
    isValid =
      validateInpName('garmentDiscount', formData['garmentDiscount']) && isValid
    if (formData.garmentDiscount === 'discount_yes') {
      isValid = validate('price', 'garmentOgCost') && isValid
      isValid = validate('price_comparison', 'garmentOgCost') && isValid
    }

    if (!isValid) {
      return false
    }

    handleForward()
    return true
  }

  return (
    <div>
      <div>
        <div
          className="container-prompt"
          onClick={() => selectID('garmentCountry')}
        >
          <p>Country of origin of the garment</p>
        </div>
        <div id={'garmentCountry_error'} style={{ textAlign: 'center' }}></div>
        <div className="container-input">
          <select
            name="garmentCountry"
            id="garmentCountry"
            value={formData.garmentCountry}
            onChange={(e) => {
              setFormData({
                ...formData,
                garmentCountry: e.target.value,
              })
              validate('country', 'garmentCountry')
            }}
            required
          >
            <option value="" disabled>
              Select a country
            </option>
            {options.map((opt) => (
              <option key={'country_' + opt.value} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div
          className="container-prompt"
          onClick={() => selectID('garmentCost')}
        >
          <p>How much did the garment cost?</p>
        </div>
        <div id={'garmentCost_error'} style={{ textAlign: 'center' }}></div>
        <div className="container-input">
          <label>$</label>
          <input
            type="number"
            name="garmentCost"
            id="garmentCost"
            placeholder="0.00"
            value={formData.garmentCost}
            onChange={(e) => {
              setFormData({
                ...formData,
                garmentCost: e.target.value,
              })
              validate('price', 'garmentCost')
            }}
            min={0}
            max={99999}
            step={0.01}
            required
          />
        </div>
      </div>

      <div>
        <div className="container-prompt">
          <p>Was the price of the garment reduced (on sale)?</p>
        </div>
        <div id={'garmentDiscount_error'} style={{ textAlign: 'center' }}></div>
        <div className="container-radio">
          <div className="container-radio-group">
            <input
              type="radio"
              id="discount_yes"
              name="garmentDiscount"
              value={1}
              onClick={(e) => {
                setFormData({
                  ...formData,
                  garmentDiscount: e.target.id,
                })
                addErrorMessageByID('garmentDiscount_error', null)
              }}
              defaultChecked={checkOnID(
                'discount_yes',
                formData.garmentDiscount,
              )}
            />
            <label htmlFor="discount_yes">Yes</label>
          </div>
          <div className="container-radio-group">
            <input
              type="radio"
              id="discount_no"
              name="garmentDiscount"
              value={0}
              onClick={(e) => {
                setFormData({
                  ...formData,
                  garmentDiscount: e.target.id,
                })
                addErrorMessageByID('garmentDiscount_error', null)
              }}
              defaultChecked={checkOnID(
                'discount_no',
                formData.garmentDiscount,
              )}
            />
            <label htmlFor="discount_no">No</label>
          </div>
        </div>
      </div>

      {formData.garmentDiscount === 'discount_yes' && (
        <div>
          <div
            className="container-prompt"
            onClick={() => selectID('garmentOgCost')}
          >
            <p>What is its original price?</p>
          </div>
          <div id={'garmentOgCost_error'} style={{ textAlign: 'center' }}></div>
          <div className="container-input">
            <label>$</label>
            <input
              type="number"
              name="garmentOgCost"
              id="garmentOgCost"
              placeholder="0.00"
              value={formData.garmentOgCost}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  garmentOgCost: e.target.value,
                })
                validate('price', 'garmentOgCost')
                validate('price_comparison', 'garmentOgCost')
              }}
              min={0}
              max={99999}
              step={0.01}
              required
            />
          </div>
        </div>
      )}

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

export default GarmentDetails_p3

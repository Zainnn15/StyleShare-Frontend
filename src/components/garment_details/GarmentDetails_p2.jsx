/* eslint-disable react/prop-types */
import '../../styles/main.scss'
import { GARMENT_TYPES } from '../../constants/data/options'
import selectImg from '../../assets/icons/select_img.png'
import { selectID, validatePage } from '../../constants/functions/inputHandlers'

const GarmentDetails_p2 = ({
  formData,
  setFormData,
  page,
  handleForward,
  handleBack,
}) => {
  const handleImageChange = (e, key) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (upload) => {
        setFormData((prev) => ({
          ...prev,
          [key]: file,
          [`${key}Preview`]: upload.target.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle navigation to the next form page
  const validateAndNext = () => {
    let querySelect = 'select, textarea'
    if (!validatePage(querySelect)) {
      return false
    }

    if (!formData.fileFront && !formData.fileFrontPreview) {
      alert('Please upload a front photo of the garment.')
      return false
    }
    if (!formData.fileBack && !formData.fileBackPreview) {
      alert('Please upload a back photo of the garment.')
      return false
    }

    handleForward()
  }

  const renderGroupedOptions = () => {
    const categories = [...new Set(GARMENT_TYPES.map((item) => item.cat))]
    return categories.map((cat) => (
      <optgroup label={cat} key={cat}>
        {GARMENT_TYPES.filter((item) => item.cat === cat).map((garment) => (
          <option key={garment.value} value={garment.value}>
            {garment.label}
          </option>
        ))}
      </optgroup>
    ))
  }

  return (
    <div>
      <div>
        <div
          className="container-prompt"
          onClick={() => selectID('garmentType')}
        >
          <p>What type of garment is it?</p>
        </div>
        <div id="garmentType_error" style={{ textAlign: 'center' }}></div>
        <div className="container-input">
          <select
            name="garmentType"
            id="garmentType"
            value={formData.garmentType}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, garmentType: e.target.value }))
            }
            required
          >
            <option value="">Select a garment...</option>
            {renderGroupedOptions()}
          </select>
        </div>
      </div>

      <div>
        <div
          className="container-prompt"
          onClick={() => selectID('garmentDescription')}
        >
          <p>Give a short description about the garment</p>
        </div>
        <div
          id="garmentDescription_error"
          style={{ textAlign: 'center' }}
        ></div>
        <div className="container-input">
          <textarea
            name="garmentDescription"
            id="garmentDescription"
            placeholder="Enter short description of garment. (Max characters 100)"
            rows={4}
            maxLength={100}
            value={formData.garmentDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                garmentDescription: e.target.value,
              }))
            }
            required
          ></textarea>
        </div>
      </div>

      <label>
        <strong>
          * Please take a photo that shows the entire garment; always try to
          choose the same background, white or black, and the same light and
          angle when taking the photo.
        </strong>
      </label>
      <div className="container-grid-2-md gap">
        {['fileFront', 'fileBack'].map((key) => (
          <div key={key}>
            <div
              className="container-prompt"
              onClick={() => document.getElementById(key).click()}
            >
              <p>
                {key === 'fileFront'
                  ? 'Front photo of the garment'
                  : 'Back photo of the garment'}
              </p>
            </div>
            <div id={`${key}_error`} style={{ textAlign: 'center' }}></div>
            <div
              className="container-input-img clickable"
              onClick={() => document.getElementById(key).click()}
            >
              <img
                id={`${key}_img`}
                src={formData[`${key}Preview`] || selectImg}
                alt={`${key} photo`}
              />
            </div>
            <input
              type="file"
              id={key}
              name={key}
              onChange={(e) => handleImageChange(e, key)}
              style={{ display: 'none' }}
            />
          </div>
        ))}
      </div>

      <div className="container-button-form">
        {page > 0 && (
          <button type="button" className="button-form" onClick={handleBack}>
            Back
          </button>
        )}
        <button className="button-form" onClick={validateAndNext} type="button">
          Next
        </button>
      </div>
    </div>
  )
}

export default GarmentDetails_p2

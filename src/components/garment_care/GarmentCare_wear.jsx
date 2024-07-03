/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react'
import '../../styles/main.scss'
import { toast } from 'react-hot-toast'
import ScreenHeaderIn from '../../components/common/ScreenHeaderIn'
import InfoPopup from '../../components/common/InfoPopup'
import axios from 'axios'
import { UserContext } from '../../../context/userContext'
import { useNavigate } from 'react-router-dom'
import { clickID } from '../../constants/functions/inputHandlers'
import selectImg from '../../assets/icons/select_img.png'
import { formatDate } from '../../constants/functions/valueHandlers'

export default function GarmentWear() {
  const navigate = useNavigate()
  const { user, loading: userLoading } = useContext(UserContext)
  const [garment, setGarment] = useState(null)
  const [garmentList, setGarmentList] = useState([])
  const [wearDate, setWearDate] = useState('')
  const [wearTime, setWearTime] = useState('')
  const [wearFront, setWearFront] = useState('')
  const [wearBack, setWearBack] = useState('')

  useEffect(() => {
    if (!userLoading && user && user._id) {
      axios
        .get(`/getGarmentDetails/${user._id}`, { withCredentials: true })
        .then((response) => {
          const garmentData = response.data
          if (Array.isArray(garmentData) && garmentData.length > 0) {
            setGarmentList(garmentData)
            setGarment(garmentData[0])
          } else {
            setGarmentList([garmentData])
            setGarment(garmentData)
          }
        })
        .catch((error) =>
          console.error('Error fetching garment details:', error),
        )
    }
  }, [user, userLoading])

  const sendGarmentDetails = async () => {
    const formData = new FormData()
    formData.append('wearDate', wearDate)
    formData.append('wearTime', wearTime)
    formData.append('userId', user._id)
    formData.append('garmentId', garment._id)
    if (wearFront && wearFront instanceof File) {
      formData.append('wearFront', wearFront)
    }
    if (wearBack && wearBack instanceof File) {
      formData.append('wearBack', wearBack)
    }

    const sampleWearInfo = {
      wearDate,
      wearTime,
      wearFront: wearFront ? URL.createObjectURL(wearFront) : null,
      wearBack: wearBack ? URL.createObjectURL(wearBack) : null,
    };

    formData.append('wearInfo', JSON.stringify([sampleWearInfo]));

    try {
      const response = await axios.post('/updateGarmentDetails', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (response.data && response.data.garmentDetail) {
        toast.success('Garment Wear details updated successfully')
        setGarment(response.data.garmentDetail)
        navigate('/garment-care')
      } else {
        throw new Error('Unexpected response format or error')
      }
    } catch (error) {
      console.error('Error sending garment wear details:', error)
      toast.error('Failed to send garment wear details.')
    }
  }

  const validateAndSubmit = (e) => {
    e.preventDefault()
    if (!wearDate || !wearTime || !wearFront || !wearBack) {
      toast.error('Please fill in all fields correctly.')
      return
    }
    sendGarmentDetails()
  }

  const getMaxDate = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  return (
    <div>
      <ScreenHeaderIn />
      <div className="container main">
        <div>
          <label className="container-title">Garment Wear</label>
          <hr />
        </div>
        <form onSubmit={validateAndSubmit}>
          <div className="container-content">
            <div>
              <p className="container-subtitle-2">Selected Garment</p>
              <select
                onChange={(e) => {
                  const index = parseInt(e.target.value, 10)
                  if (index >= 0 && index < garmentList.length) {
                    const selectedGarment = garmentList[index]
                    setGarment(selectedGarment) // Updates the state with the selected garment
                  }
                }}
                value={
                  garment
                    ? garmentList.findIndex((g) => g._id === garment._id)
                    : ''
                }
              >
                {garmentList.map((garmentOpt, index) => (
                   <option key={"garmentOpt_" + index} value={index}>
                   {garmentOpt.garmentDescription} ({formatDate(garmentOpt.purchaseDate)})
               </option>
                ))}
              </select>
            </div>
            <br />

            <div id={'dateWorn_error'} style={{ textAlign: 'center' }}></div>
            <label className="text-b">Date worn:</label>
            <label className="tab"></label>
            <input
              type="date"
              id="dateWorn"
              value={wearDate}
              max={getMaxDate()}
              onChange={(e) => setWearDate(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="container-prompt">
              <p>How long was the garment worn?</p>
              <InfoPopup text="How many hours was the garment worn? If not known, use your best estimate" />
            </div>
            <div id={'hoursWorn_error'} style={{ textAlign: 'center' }}></div>
            <div className="container-input">
              <input
                type="number"
                id="hoursWorn"
                name="hoursWorn"
                value={wearTime}
                onChange={(e) => setWearTime(e.target.value)}
                placeholder="Enter number of hours worn"
                min={0}
                step={0.01}
                required
              />
            </div>
          </div>
          <br />

          <p>
            * Please take a photo that shows the entire garment; always try to
            choose the same background, white or black, and the same light and
            angle when taking the photo.
          </p>
          <div className="container-grid-2-md gap">
            <div>
              <div className="container-prompt">
                <p>Front photo of the garment after wearing</p>
              </div>
              <div
                className="container-input-img clickable"
                onClick={() => clickID('fileWearFront')}
              >
                <img
                  id="fileWearFront_img"
                  src={wearFront ? URL.createObjectURL(wearFront) : selectImg}
                  alt="Front Wear"
                />
              </div>
              <p>
                * Please take a photo that shows the entire garment; always try
                to choose the same background, white or black, and the same
                light and angle when taking the photo.
              </p>
              <div className="container-input">
                <input
                  id="fileWearFront"
                  type="file"
                  onChange={(e) => setWearFront(e.target.files[0])}
                  required
                />
              </div>
            </div>

            <div>
              <div className="container-prompt">
                <p>Back photo of the garment after wearing</p>
              </div>
              <div
                className="container-input-img clickable"
                onClick={() => clickID('fileWearBack')}
              >
                <img
                  id="fileWearBack_img"
                  src={wearBack ? URL.createObjectURL(wearBack) : selectImg}
                  alt="Back Wear"
                />
              </div>
              <div className="container-input">
                <input
                  id="fileWearBack"
                  type="file"
                  onChange={(e) => setWearBack(e.target.files[0])}
                  required
                />
              </div>
            </div>
          </div>

          <br />
          <div className="container-input">
            <button className="button-form full" type="submit">
              Save
            </button>
            <button className="button-form full" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

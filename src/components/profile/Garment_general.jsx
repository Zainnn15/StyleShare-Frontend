/* eslint-disable react/prop-types */
import '../../styles/main.scss'
import {
  findAttribute,
  formatDate,
  getElemByMaxAttr,
  getImageFromURL,
} from '../../constants/functions/valueHandlers'
import { GARMENT_TYPES } from '../../constants/data/options'
import { id_purchaseMethod } from '../../constants/data/inputID'
import { useEffect, useState } from 'react'
import Axios from 'axios'

const Garment_general = ({ garment }) => {
  const [maxWearInfo, setMaxWearInfo] = useState('')
  const [originalOwner, setOriginalOwner] = useState('')

  useEffect(() => {
    //get latest wear
    if (garment.wearInfo && garment.wearInfo.length > 0) {
      setMaxWearInfo(getElemByMaxAttr(garment.wearInfo, 'wearDate', true))
    }

    setOriginalOwner('')
    if (!garment.originalOwner) {
      setOriginalOwner('n/a')
      return
    }

    console.log('UPDATING', garment.garmentDescription)
    Axios.get(`/profile/${garment.originalOwner}`)
      .then((res) => {
        setOriginalOwner(res.data.user.name)
      })
      .catch((err) => {
        console.log(err)
        setOriginalOwner('n/a')
      })
  }, [garment])

  return (
    <div className="m1">
      <label className="container-subtitle-2">Details</label>
      <div className="container-grid-2-md gap container-border clear-box">
        <div>
          <p>
            <label className="text-b">
              Type:<label className="tab"></label>
            </label>
            {findAttribute(GARMENT_TYPES, garment.garmentType)}
          </p>
          <p>
            <label className="text-b">
              Original Owner:<label className="tab"></label>
            </label>
            {originalOwner}
          </p>
          <p>
            <label className="text-b">
              Description:<label className="tab"></label>
            </label>
          </p>
          <div className="container-border m1-v">
            <label>{garment.garmentDescription}</label>
          </div>
          <p>
            <label className="text-b">
              Country of Origin:<label className="tab"></label>
            </label>
            {garment.garmentCountry}
          </p>
        </div>

        <div>
          <p>
            <label className="text-b">
              Store:<label className="tab"></label>
            </label>
            {garment.purchaseLocation}
          </p>
          <p>
            <label className="text-b">
              Purchase Date:<label className="tab"></label>
            </label>
            {formatDate(garment.purchaseDate)}
          </p>
          <p>
            <label className="text-b">
              Purchase Method:<label className="tab"></label>
            </label>
            {id_purchaseMethod[garment.purchaseMethod]}
          </p>
          <p>
            <label className="text-b">
              Cost:<label className="tab"></label>
            </label>
            $ {garment.garmentCost}
            {garment.garmentDiscount === 'discount_yes' && (
              <label> (Discounted)</label>
            )}
          </p>
          {garment.garmentDiscount === 'discount_yes' && (
            <p>
              <label className="tab"></label>
              <label className="text-b">
                Original Price:<label className="tab"></label>
              </label>
              $ {garment.garmentOgCost}
            </p>
          )}
        </div>
      </div>
      <br />
      <label className="container-subtitle-2">Photos</label>
      <div className="container-grid-2-md gap container-border clear-box">
        <div>
          <p>
            <label className="text-b">
              Original Front Photo ({formatDate(garment.purchaseDate)}):
              <label className="tab"></label>
            </label>
          </p>
          <div className="container-input-img img-size-sm">
            <img src={getImageFromURL(garment.fileFront)} alt="front" />
          </div>
        </div>
        <div>
          <p>
            <label className="text-b">
              Original Front Photo ({formatDate(garment.purchaseDate)}):
              <label className="tab"></label>
            </label>
          </p>
          <div className="container-input-img img-size-sm">
            <img src={getImageFromURL(garment.fileBack)} alt="back" />
          </div>
        </div>

        {garment.wearInfo &&
          garment.wearInfo.length > 0 &&
          maxWearInfo !== '' &&
          maxWearInfo.wearDate && (
            <div>
              <p>
                <label className="text-b">
                  Current Front Photo ({formatDate(maxWearInfo.wearDate)}):
                  <label className="tab"></label>
                </label>
              </p>
              <div className="container-input-img img-size-sm">
                <img src={getImageFromURL(maxWearInfo.wearFront)} alt="front" />
              </div>
            </div>
          )}
        {garment.wearInfo &&
          garment.wearInfo.length > 0 &&
          maxWearInfo !== '' &&
          maxWearInfo.wearDate && (
            <div>
              <p>
                <label className="text-b">
                  Current Back Photo ({formatDate(maxWearInfo.wearDate)}):
                  <label className="tab"></label>
                </label>
              </p>
              <div className="container-input-img img-size-sm">
                <img src={getImageFromURL(maxWearInfo.wearBack)} alt="front" />
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default Garment_general

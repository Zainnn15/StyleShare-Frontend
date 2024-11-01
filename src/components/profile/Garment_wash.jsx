/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { careInstructions } from '../../constants/data/lists';
import { formatDate, formatTemp } from '../../constants/functions/valueHandlers';
import '../../styles/main.scss';
import InfoPopup from '../common/InfoPopup';
import Axios  from 'axios';

const Garment_wash = ({ garment }) => {
    const [careInfo, setCareInfo] = useState(garment ? garment.washCareInstructions : []);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/garment-wash/`);
    };

    const handleDelete = (id) => {
        const updatedCareInfo = careInfo.filter(care => care._id !== id);
        setCareInfo(updatedCareInfo);
    };

    const [originalOwner, setOriginalOwner] = useState('')

    useEffect(() => {
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
            {
                // garment && garment.washCareInstructions &&
                // garment.washCareInstructions.map((care) => {
                careInfo.map((care) => {
                    const washMethod = careInstructions[care.careWash?.Method];
                    const washHeat = care.careWash?.Heat && careInstructions[care.careWash?.Heat];
                    const airMethod = care.careDry?.Air && careInstructions[care.careDry?.Air];
                    const shadeMethod = care.careDry?.Shade && careInstructions[care.careDry?.Shade];
                    const dryMethod = careInstructions[care.careDry?.Method];
                    const dryHeat = care.careDry?.Heat && careInstructions[care.careDry?.Heat];
                    const drySolvent = care.careDryC?.Solvent && careInstructions[care.careDryC?.Solvent];
                    const dryCare = care.careDryC?.Care && careInstructions[care.careDryC?.Care];
                    const ironHeat = care.careIron?.Heat && careInstructions[care.careIron?.Heat];

                    return (
                        <div key={care._id}>
                            <label className="container-subtitle-2">{formatDate(care.washDate)}</label>
                            <div className="container-grid-3-md gap container-border clear-box">
                                <div>
                                    {/* {garment?.user?.name ? ( */}
                                        <p>
                                            <label className='text-b'>Owner:<label className='tab'></label></label>
                                            {/* {garment.user.name} */}
                                            {originalOwner}
                                        </p>
                                    {/* ) : null} */}
                                    {care.modifier? (
                                        <p>
                                            <label className="text-b">Wash Username:<label className="tab"></label></label>
                                            {care.modifier}
                                        </p>
                                    ) : null}
                                    <p>
                                        <label className="text-b">Wash Method:<label className="tab"></label></label>
                                        {washMethod && care.careWash.Method !== "noWash" && (
                                            <>
                                                <img className="w-sm" src={washMethod.img} alt='img' />
                                                <InfoPopup text={washMethod.name} />
                                            </>
                                        )}
                                    </p>
                                    {
                                        care.careWash?.Method &&
                                        care.careWash.Method !== "noWash" && care.careWash.Method !== "washHand" &&
                                        care.careWash?.Heat &&
                                        care.careWash.Heat !== "washHeatXXC" && care.careWash.Heat !== "washHeatXXF" && (
                                            <p>
                                                <label className="text-b">Wash Heat:<label className="tab"></label></label>
                                                {washHeat && (
                                                    <>
                                                        <img className="w-sm" src={washHeat.img} alt='img' />
                                                        <InfoPopup text={washHeat.name} />
                                                    </>
                                                )}
                                            </p>
                                        )
                                    }
                                    {
                                        care.careWash?.Method &&
                                        care.careWash.Method !== "noWash" && care.careWash.Method !== "washHand" &&
                                        care.careWash?.Heat &&
                                        (care.careWash.Heat === "washHeatXXC" || care.careWash.Heat === "washHeatXXF") && (
                                            <p>
                                                <label className="text-b">Wash Heat:<label className="tab"></label></label>
                                                {careInstructions["washHeatXX"] && (
                                                    <>
                                                        <img className="w-sm" src={careInstructions["washHeatXX"].img} alt='img' />
                                                        <InfoPopup text={formatTemp(care.careWash.Temp)} />
                                                    </>
                                                )}
                                            </p>
                                        )
                                    }
                                </div>

                                <div>
                                    {
                                        care.careDry?.Method &&
                                        care.careDry.Method === "noTumble" && (
                                            <p>
                                                <label className="text-b">Dry Method:<label className="tab"></label></label>
                                                {airMethod ? (
                                                    <>
                                                        <img className="w-sm" src={airMethod.img} alt='img' />
                                                        <InfoPopup text={airMethod.name} />
                                                    </>
                                                ) : shadeMethod && (
                                                    <>
                                                        <img className="w-sm" src={shadeMethod.img} alt='img' />
                                                        <InfoPopup text={shadeMethod.name} />
                                                    </>
                                                )}
                                            </p>
                                        )
                                    }

                                    {
                                        care.careDry?.Method &&
                                        care.careDry.Method !== "noTumble" && care.careDry.Method !== "" && (
                                            <div>
                                                <p>
                                                    <label className="text-b">Dry Method:<label className="tab"></label></label>
                                                    {dryMethod && (
                                                        <>
                                                            <img className="w-sm" src={dryMethod.img} alt='img' />
                                                            <InfoPopup text={dryMethod.name} />
                                                        </>
                                                    )}
                                                </p>
                                                <p>
                                                    <label className="text-b">Dry Heat:<label className="tab"></label></label>
                                                    {dryHeat && (
                                                        <>
                                                            <img className="w-sm" src={dryHeat.img} alt='img' />
                                                            <InfoPopup text={dryHeat.name} />
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        )
                                    }

                                    {
                                        care.careDry?.Method === "" && (
                                            <p>
                                                <label className="text-b">Dry Method:<label className="tab"></label></label>
                                                <label>No Dry</label>
                                            </p>
                                        )
                                    }
                                </div>

                                <div>
                                    {
                                        care.careDryC?.Solvent ? (
                                            <div>
                                                <p>
                                                    <label className="text-b">Dry Clean Solvent:<label className="tab"></label></label>
                                                    {drySolvent && (
                                                        <>
                                                            <img className="w-sm" src={drySolvent.img} alt='img' />
                                                            <InfoPopup text={drySolvent.name} />
                                                        </>
                                                    )}
                                                </p>
                                                <p>
                                                    <label className="text-b">Dry Clean Care:<label className="tab"></label></label>
                                                    {dryCare && (
                                                        <>
                                                            <img className="w-sm" src={dryCare.img} alt='img' />
                                                            <InfoPopup text={dryCare.name} />
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>
                                                    <label className="text-b">Dry Clean:<label className="tab"></label></label>
                                                    <label>N/A</label>
                                                </p>
                                            </div>
                                        )
                                    }

                                    {
                                        care.ironDuration ? (
                                            <div>
                                                <p>
                                                    <label className="text-b">Iron Duration:<label className="tab"></label></label>
                                                    <label>{care.ironDuration} minutes</label>
                                                </p>
                                                <p>
                                                    <label className="text-b">Iron Heat:<label className="tab"></label></label>
                                                    {ironHeat && (
                                                        <>
                                                            <img className="w-sm" src={ironHeat.img} alt='img' />
                                                            <InfoPopup text={ironHeat.name} />
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>
                                                    <label className="text-b">Iron:<label className="tab"></label></label>
                                                    <label>N/A</label>
                                                </p>
                                            </div>
                                        )
                                    }

                                    {
                                        care.ventilatedTime ? (
                                            <div>
                                                <p>
                                                    <label className="text-b">Ventilated Time:<label className="tab"></label></label>
                                                    <label>{care.ventilatedTime} hours</label>
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>
                                                    <label className="text-b">Ventilated:<label className="tab"></label></label>
                                                    <label>N/A</label>
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div>
                                <button className="button-regular" style={{ margin: '5px' }} onClick={() => handleEdit()}>Add</button>
                                {/* <button className="button-regular" onClick={() => handleDelete(care._id)}>Delete</button> */}
                                <button 
                                    className="button-regular" 
                                    onClick={() => {
                                    if (window.confirm('Are you sure delete this item?')) {
                                    handleDelete(care._id);
                                    }
                                    }}>Delete</button>
                            </div>
                            <br />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Garment_wash;

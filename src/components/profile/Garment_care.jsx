/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { formatTemp, getAttrByInpID } from '../../constants/functions/valueHandlers';
import '../../styles/main.scss';
import CircleImg from '../common/CircleImg';
import { id_instructionBleach, id_instructionDry, id_instructionDryC, id_instructionIron, id_instructionTumble, id_instructionWash } from '../../constants/data/inputID';

const Garment_care = ({garment}) => {
    const [instructions, setInstructions] = useState({
        "Wash": "",
        "Tumble":"",
        "DryC":"",
        "Iron":"",
        "Bleach":""
    });

    useEffect(() => {
        if(garment) {
            setInstructions({
              ...instructions, 
              "Wash": garment.instructionWash,
              "Tumble": garment.instructionTumble,
              "DryC": garment.instructionDryC,
              "Iron": garment.instructionIron,
              "Bleach": garment.instructionBleach,
            });
        }
    }, []);

    return(
        <div className="m1">
            <label className="container-subtitle-2">Washing Instructions</label>
            <div className="container-border">
            <div className="container-care">
                <div className="container-care-group">
                    <span className="container-care-img">
                    <CircleImg className="img-care" 
                        iconUrl={getAttrByInpID(instructions.Wash["Wash"], id_instructionWash)}
                        width="50%"/>
                    <label>
                        {getAttrByInpID(instructions.Wash["Wash"], id_instructionWash, "name")}
                    </label>
                    </span>
                </div>

                {
                    instructions.Wash["Wash"] === "wash_yes" &&
                    <div className="container-care-group">
                    <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={getAttrByInpID(instructions.Wash["Machine"], id_instructionWash)}
                            width="50%"/>
                        <label>
                        {getAttrByInpID(instructions.Wash["Machine"], id_instructionWash, "name")}
                        </label>
                    </span>
                    </div>
                }

                {
                    instructions.Wash["Wash"] === "wash_yes" &&
                    instructions.Wash["Heat"] !== "wash_heat_xx" &&
                    instructions.Wash["Heat"] !== "" &&
                    <div className="container-care-group">
                    <span className="container-care-img">
                    <CircleImg className="img-care" 
                        iconUrl={getAttrByInpID(instructions.Wash["Heat"], id_instructionWash)} 
                        width="50%"/>
                    <label>
                        {getAttrByInpID(instructions.Wash["Heat"], id_instructionWash, "name")}
                    </label>
                    </span>
                </div>
                }

                {
                    instructions.Wash["Wash"] === "wash_yes" &&
                    instructions.Wash["Heat"] === "wash_heat_xx" &&
                    instructions.Wash["Temp"] !== "" &&
                    <div className="container-care-group">
                    <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={getAttrByInpID(instructions.Wash["Heat"], id_instructionWash)} 
                            width="50%"/>
                        <label>
                        {
                            formatTemp(instructions.Wash["Temp"])
                        }
                        </label>
                    </span>
                    </div>
                }

            </div>
            </div>
            <br/>
        
            <label className="container-subtitle-2">Tumble Drying Instructions</label>
            <div className="container-border">
            <div className="container-care">
                <div className="container-care-group">
                    <span className="container-care-img">
                    <CircleImg className="img-care" 
                        iconUrl={getAttrByInpID(instructions.Tumble["Tumble"], id_instructionTumble)}
                        width="50%"/>
                    <label>
                        {getAttrByInpID(instructions.Tumble["Tumble"], id_instructionTumble, "name")}
                    </label>
                    </span>
                </div>

                {
                    instructions.Tumble["Tumble"] === "tumble_no" &&
                    <div className="container-care-group">
                    <span className="container-care-img">
                    <CircleImg className="img-care" 
                        iconUrl={getAttrByInpID(instructions.Tumble["Air"], id_instructionDry)} 
                        width="50%"/>
                    <label>
                        {getAttrByInpID(instructions.Tumble["Air"], id_instructionDry, "name")}
                    </label>
                    </span>
                </div>
                }

                {
                    instructions.Tumble["Tumble"] === "tumble_no" &&
                    instructions.Tumble["Air"] === "dry_shade" &&
                    <div className="container-care-group">
                        <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={getAttrByInpID(instructions.Tumble["Shade"], id_instructionDry)} 
                            width="50%"/>
                        <label>
                            {getAttrByInpID(instructions.Tumble["Shade"], id_instructionDry, "name")}
                        </label>
                        </span>
                    </div>
                }

                {
                    instructions.Tumble["Tumble"] === "tumble_yes" &&
                    <div className="container-care-group">
                        <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={getAttrByInpID(instructions.Tumble["Delicate"], id_instructionTumble)} 
                            width="50%"/>
                        <label>
                            {getAttrByInpID(instructions.Tumble["Delicate"], id_instructionTumble, "name")}
                        </label>
                        </span>
                    </div>    
                }

                {
                    instructions.Tumble["Tumble"] === "tumble_yes" &&
                    <div className="container-care-group">
                    <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={getAttrByInpID(instructions.Tumble["Heat"], id_instructionTumble)} 
                            width="50%"/>
                        <label>
                        {getAttrByInpID(instructions.Tumble["Heat"], id_instructionTumble, "name")}
                        </label>
                    </span>
                    </div>
                }

            </div>
            </div>
            <br/>

            <label className="container-subtitle-2">Dry Cleaning Instructions</label>
            <div className="container-border">
            <div className="container-care">
                <div className="container-care-group">
                <span className="container-care-img">
                    <CircleImg className="img-care" 
                    iconUrl={getAttrByInpID(instructions.DryC["DryC"], id_instructionDryC)} 
                    width="50%"
                    />
                    <label>
                    {getAttrByInpID(instructions.DryC["DryC"], id_instructionDryC, "name")}
                    </label>
                </span>
                </div>

                {
                instructions.DryC["DryC"] === "dryC_yes" &&
                <div className="container-care-group">
                <span className="container-care-img">
                    <CircleImg className="img-care" 
                        iconUrl={getAttrByInpID(instructions.DryC["Solvent"], id_instructionDryC)} 
                        width="50%"/>
                    <label>
                    {getAttrByInpID(instructions.DryC["Solvent"], id_instructionDryC, "name")}
                    </label>
                </span>
                </div>
                }

                {
                instructions.DryC["DryC"] === "dryC_yes" &&
                <div className="container-care-group">
                <span className="container-care-img">
                    <CircleImg className="img-care" 
                        iconUrl={getAttrByInpID(instructions.DryC["Care"], id_instructionDryC)} 
                        width="50%"/>
                    <label>
                    {getAttrByInpID(instructions.DryC["Care"], id_instructionDryC, "name")}
                    </label>
                </span>
                </div>
                }

            </div>
            </div>
            <br/>

            <label className="container-subtitle-2">Ironing Instructions</label>
            <div className="container-border">
            <div className="container-care">
                <div className="container-care-group">
                    <span className="container-care-img">
                    <CircleImg className="img-care" 
                        iconUrl={getAttrByInpID(instructions.Iron["Iron"], id_instructionIron)} 
                        width="50%"
                    />
                    <label>
                        {getAttrByInpID(instructions.Iron["Iron"], id_instructionIron, "name")}
                    </label>
                    </span>
                </div>

                {
                    instructions.Iron["Iron"] === "iron_yes" &&
                    <div className="container-care-group">
                    <span className="container-care-img">
                        <CircleImg className="img-care" 
                            iconUrl={getAttrByInpID(instructions.Iron["Heat"], id_instructionIron)} 
                            width="50%"/>
                        <label>
                        {getAttrByInpID(instructions.Iron["Heat"], id_instructionIron, "name")}
                        </label>
                    </span>
                    </div>
                }

            </div>
            </div>
            <br/>

            <label className="container-subtitle-2">Bleaching Instructions</label>
            <div className="container-border">
            <div className="container-care">
                <div className="container-care-group">
                <span className="container-care-img">
                    <CircleImg className="img-care" 
                    iconUrl={getAttrByInpID(instructions.Bleach["Bleach"], id_instructionBleach)} 
                    width="50%"
                    />
                    <label>
                    {getAttrByInpID(instructions.Bleach["Bleach"], id_instructionBleach, "name")}
                    </label>
                </span>
                </div>
            </div>
            </div>

        </div>
    )
}

export default Garment_care;
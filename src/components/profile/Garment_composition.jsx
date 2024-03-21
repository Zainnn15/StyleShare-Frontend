/* eslint-disable react/prop-types */
import '../../styles/main.scss';

const Garment_composition = ({garment}) => {
    return(
        <div>
            <div className="container-border clear-box m1">
                <div className="container-grid-3-md gap m1-v">
                <div>
                    <p className="text-b text-u center m0">Main</p>
                    <ul>
                    {
                    garment.compositionMain.map((comp, index)=>{
                        return (
                        <li key={"main_"+index}>
                            <label>{comp.value}:</label>
                            <label className="tab"></label>
                            <label>{comp.percent}%</label>
                        </li>
                        )
                    })
                    }
                    </ul>
                </div>

                <div>
                    <p className="text-b text-u center m0">Lining</p>
                    {!garment.compositionLining.length > 0 && <p>N/A</p>}
                    <ul>
                    {
                    garment.compositionLining.length > 0 &&
                    garment.compositionLining.map((comp, index)=>{
                        return (
                        <li key={"lining_"+index}>
                            <label>{comp.value}:</label>
                            <label className="tab"></label>
                            <label>{comp.percent}%</label>
                        </li>
                        )
                    })
                    }
                    </ul>
                </div>

                <div>
                    <p className="text-b text-u center m0">Padding/Stuffing</p>
                    {!garment.compositionPadding.length > 0 && <p>N/A</p>}
                    <ul>
                    {
                    garment.compositionPadding.length > 0 &&
                    garment.compositionPadding.map((comp, index)=>{
                        return (
                        <li key={"padding_"+index}>
                            <label>{comp.value}:</label>
                            <label className="tab"></label>
                            <label>{comp.percent}%</label>
                        </li>
                        )
                    })
                    }
                    </ul>
                </div>

                </div>
            </div>
        </div>
    )
}

export default Garment_composition;
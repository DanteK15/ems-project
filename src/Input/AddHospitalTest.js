import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { actionTypes } from '../Context/reducer'
import { useStateValue } from "../Context/StateProvider"
import AutoComplete from "../Maps/AutoComplete"


const AddDelHospitalTest = () => {
    const [{gmaps, hospitals, patientLocal}, dispatch] = useStateValue();

    const logHospitals = () => {
        if(!isEmpty(hospitals)){
            console.log(hospitals);
            console.log(patientLocal);
        }
    }
    const newHospital = (place) => {
        dispatch({
            type: actionTypes.SET_HOSP,
            hospital: place
        })
    } 

    const delFirstHospital = () => {
        dispatch({
            type: actionTypes.DEL_HOSP,
            index: 0
        })
    }

    return (
        
        <div>
            {!isEmpty(gmaps) && <AutoComplete map={gmaps.map} mapApi={gmaps.maps} newPlace={newHospital}/>}
            <btn style={{margin:'5px', border:'2px solid black', textAlign: 'center'}} onClick={logHospitals}>log</btn> 
            <btn style={{margin:'5px', border:'2px solid black', textAlign: 'center'}} onClick={delFirstHospital}>removeFirstHospital</btn> 
        </div>
    )
}

export default AddDelHospitalTest
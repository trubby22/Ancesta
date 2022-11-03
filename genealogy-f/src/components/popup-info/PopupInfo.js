import Button from 'react-bootstrap/Button';
import {FilterForm} from '../filter/Filter.js'
import React from "react";
import {AiOutlineClose} from "react-icons/ai"
import "./PopupInfo.css"

function PopupInfo(props) {
    return (
        <div className='popup-inner'>
            <button className='close-btn' onClick={props.closePopUp}>
                <AiOutlineClose size={30} color='red'/>
            </button>
            {/* <div class="row"> */}
            {getAdditionalProperties(props.info)}
            {/* </div> */}
             
        </div>
    )
}

function getAdditionalProperties(data) {
    return (
        
        <div> 
            <h2>{data.get("Name")}</h2>
            {/* <div className="row">
                <div className="col_key" >
                    {getAttrName(data)}
                </div>
                <div className="col_val" >
                    {getAttrVal(data)}
                </div>
            </div> */}
            {getAllAttr(data)}
        </div> 
    )
    // return Object.keys(Object.fromEntries(data)).map((k) => (
    //     <div key={k}>
    //         <div key='k'><h4>{k}:  {data.get(k)}</h4></div>
    //     </div>
    // ))
}

function getAllAttr(data) {
    return Object.keys(Object.fromEntries(data)).map((k) => (
        <div className="row" key={k}>
            <div id='col_key'>
                <p>{k}</p>
            </div>
            <div id='col_val'>
                <p>{data.get(k)}</p>
            </div>
        </div>
    ))
}

function getAttrName(data) {
    return Object.keys(Object.fromEntries(data)).filter(function (k) {
        return k !== "Name";
      }).map((k) => (
        <div id='key' key={k}>
            <p>{k}</p>
        </div>
    ))
}

function getAttrVal(data) {
    return Object.keys(Object.fromEntries(data)).filter(function (k) {
        return k !== "Name";
      }).map((k) => (
        <div id='val' key={data.get(k)}>
            <p>{data.get(k)}</p>
        </div>
    ))
}

export default PopupInfo
import React, { useState } from 'react';
const mongoose = require('mongoose'); 
 
export default function Group({number}) {
    return(
        <h1>Group {number}</h1>
    )
}
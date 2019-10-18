import React, { useState, useEffect } from "react";
import axiosWithAuth from './axios';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const colorsURL = 'http://localhost:5000/api/colors'

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const getAllColors = () => {
    axiosWithAuth().get(colorsURL)
      .then(res => {
        setColorList(res.data);
        console.log(colorList)
      })
      .catch(err => {
        alert(err);
      });
  };

  useEffect(() => {
    getAllColors();
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getAllColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

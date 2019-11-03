import React, { useState } from "react";
import axiosWithAuth from './axios';
import { Formik, Form, Field } from 'formik';

const colorsURL = 'http://localhost:5000/api/colors'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    const payload1 = e.target[0].value
    const payload2 = e.target[1].value
    // const payload = {payload1, payload2}
    const colorId = colorToEdit.id
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth().put(
      `${colorsURL}/${colorId}`,
      {color: payload1, 
      code: {hex: payload2},
      id: colorId}
    )
      .then(res => {
        getColors();
        // updateColors(res.data);
        setEditing(false);
      })
      .catch(err => {
      });
  };

  console.log(colors);

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`${colorsURL}/${color.id}`)
      .then(({data}) => {
        updateColors(colors.filter(color => color.id !== data));
        setEditing(false);
      })
      .catch(err => {
    
      })
  };

  const addColor = (formValues, resetForm) => {
    axiosWithAuth().post(colorsURL, {color: formValues.color, 
      code: {hex: formValues.hex}
      })
      .then(res => {
        getColors();
        resetForm({});
      })
      .catch(err => {
        
      })
  }

  var styles2 = {
    margin: '5px',
    width: '200px',
    height: '50px',
    borderRadius: '10px',
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

      <Formik
        initialValues={{color: '', hex: ''}}
        onSubmit={addColor}
        render={() => (
            <Form>
              <div>
                <Field style={styles2} name='color' type="text" placeholder='color' />
              </div>
              <div>
                <Field style={styles2} name='hex' type="text" placeholder='hex' />
              </div>
               <div>
                <input type='submit' />
              </div>
            </Form>
        )}
      />
    </div>
  );
};

export default ColorList;

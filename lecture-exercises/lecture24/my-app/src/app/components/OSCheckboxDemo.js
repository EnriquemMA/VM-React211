"use client"
//import DisplayOS from './DisplayOS.js'
import CheckboxForm from '/components/CheckboxForm.js'
import { Fragment, useState } from 'react';

const OSCheckboxDemo = () => {
    const [checkboxGroup, setCheckboxGroup ] = 
      useState( { linux: false, mac: false, windows: false });
    
      const operatingSystemList = Object.keys(checkboxGroup);

      const handleCheckbox = event => {
        setCheckbox({ ...checkboxGroup, 
         [event.target.value]: event.target.checked
        });
      }

      return (
        <form>
          <fieldset>
            <legend>Select which OS's you use:</legend>
            { operatingSystemList.map( os => 
              <Fragment key={os}>
                <label>
                  <input type='checkbox' name='checkboxGroup' value={os}
                  checked={checkboxGroup.os}
                  onChange={handleCheckbox} />
                  &nbsp;{os.charAt(0).toUpperCase() + os.slice(1)}
              </label>
              <br/><br/>
              </Fragment>
              )}
            </fieldset>
        </form>
      )

  }

export default OSCheckboxDemo;
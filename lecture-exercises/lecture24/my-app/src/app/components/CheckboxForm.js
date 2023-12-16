"use client"
//import DisplayOS from './DisplayOS1.js'
import CheckboxForm from '/components/CheckboxForm.js'
import { Fragment, useState } from 'react';

const CheckboxForm = () => {

            let enableSubmit = false;
            let history = ReactRouterDOM.useHistory();

            const [checkboxGroup, setCheckboxGroup] =
                useState({ linux: false, mac: false, windows: false });

            for (const checked of Object.values(checkboxGroup)) {
                if (checked) { enableSubmit = true; }
            }

            const handleSubmit = event => {
                event.preventDefault();
                //setShowForm(false);                
                history.push('/results', checkboxGroup);
            }

            const handleCheckbox = event => {
                setCheckboxGroup({
                    ...checkboxGroup,
                    [event.target.value]: event.target.checked
                });
            }

            const operatingSystemList = Object.keys(checkboxGroup);

            return (
                < form onSubmit={handleSubmit} >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Select which OS('s) you use:</FormLabel>
                        <FormGroup>
                            {operatingSystemList.map(os =>
                                <Fragment key={os}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={checkboxGroup.os} onChange={handleCheckbox} value={os} />}
                                        label={os.charAt(0).toUpperCase() + os.slice(1)}
                                    />
                                    <br /><br />
                                </Fragment>
                            )}
                            {/* Submit with ternary operator - conditional rendering */}
                            {enableSubmit
                                ? <Button variant="contained" color="primary" type="submit">Submit</Button>
                                : <Button variant="contained" color="primary" type="submit" disabled>Submit</Button>
                            }
                        </FormGroup>
                    </FormControl>
                </form >
            )
        }

export default CheckboxForm;
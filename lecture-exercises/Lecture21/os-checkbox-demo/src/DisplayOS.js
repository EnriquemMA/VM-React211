import { Link } from 'react-router-dom';

const DisplayOS = ({ location }) => {
    // allOS is going to be the string of OS's user checked
    let allOS = '';
    let plural = '';
   // const Link = ReactRouterDOM.Link;

    for (const [os, isChecked] of Object.entries(location.state)) {
      if (isChecked) {
        if (allOS.length === 0) {
          allOS += os.charAt(0).toUpperCase() + os.slice(1);
        } else {
          allOS += ', ' + os.charAt(0).toUpperCase() + os.slice(1);
          plural = 's';
        }
      }
    }

    return (
      <>
        <h1>You use the {allOS} Operating System{plural}.</h1>
        <nav><Link to="/">Back to Form</Link></nav>
      </>
    );

  }

  export default DisplayOS;
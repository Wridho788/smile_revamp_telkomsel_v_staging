import * as React from 'react';
import { Link} from 'react-router-dom';
import Button from "../../atoms/button";
export default function Index() {
  return (
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/topics'>Topics</Link></li>
            <li><Link to='/settings'>Settings</Link></li>
          </ul>
          <hr />
            <Button label="tes" fontSize="10"/>
        </div>
  )
}
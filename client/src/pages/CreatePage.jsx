import React, {useState, useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

import {useHistory} from 'react-router-dom';

const CreatePage = () => {
  const auth = useContext(AuthContext);
  const [link, setLink] = useState('');
  const {request} = useHttp();
  const history = useHistory();

  const pressHandler = (e) => {
    if (e.key === 'Enter') {
      try {
        const data = request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        });
        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  }

  return (
    <div className="container">
      <div className="col s8 offset-s2">
        <form className="col s12">
          <div className="row">
            <div className="input-field">
              <input
                placeholder="Link"
                id="link"
                type="text"
                onChange={(e) => {setLink(e.target.value)}}
                onKeyPress={pressHandler}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePage;

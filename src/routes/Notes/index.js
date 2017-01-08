import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CryptoJS from 'crypto-js';
import _ from 'lodash';
// import fs from 'fs-extra';

import { setDecryptor } from 'store/actions';

const debounceDecryptorChange = _.debounce((dispatch, decryptor) => {
  dispatch(setDecryptor(decryptor));
}, 1000);

const writeNotes = _.debounce((notes, decryptor) => {
  const text = CryptoJS.AES.encrypt(JSON.stringify(notes), decruptor)
  // fs.writeFile("../../store/data/whatever.txt", text, function(err) {
  //     if(err) {
  //       return console.log(err);
  //     }

  //     console.log("Notes updated!");
  // });
}, 2000);

const debounceNoteChange = (setState, notes, topic, index, key, value) => {
  const newNotes = newNotesState(notes, topic, index, key, value);
  setState({ notes: newNotes });
  writeNotes(newNotes);
};

const newNotesState = (notes, topic, index, key, value) => {
  const newNote = Object.assign({}, notes[topic][index], { [key]: value });
  const newTopic = notes[topic];
  newTopic[index] = newNote;

  return Object.assign(
    notes,
    {
      [topic]: newTopic
    }
  )
};

export class Notes extends React.Component {
  constructor(props) {
    super(props);
    const { notes, decryptor, dispatch } = props;
    let stringifiedNotebook = '';
    try {
      const bytes = CryptoJS.AES.decrypt(notes, decryptor);
      stringifiedNotebook = bytes.toString(CryptoJS.enc.Utf8);
    } catch(e) { }
    if (stringifiedNotebook.includes('Unusual Passes')) {
      this.state = {
        decrypted: true,
        notes: JSON.parse(stringifiedNotebook),
        editable: null
      }
    } else {
      this.state = {};
    }
  }

  render() {
    const { decrypted, editable, notes } = this.state;
    const { decryptor, dispatch } = this.props;
    if (decrypted) {
      return (
        <div className="row container notes">
          <div className="container centerify">
            {
              Object.keys(notes).map(topic => (
                <div key={ topic }>
                  <h2>{ topic }</h2>
                  {
                    notes[topic].map((note, index) => (
                      editable === [topic, note.name].join('-') ?
                        <span className="inset inline-inputs" key={ index }>
                          <input
                            type="text"
                            defaultValue={ note.name }
                            onChange={ e => {
                              const newNotes = newNotesState(notes, topic, index, 'name', e.target.value);
                              this.setState({ notes: newNotes });
                              writeNotes(newNotes, decryptor);
                            } }
                          />
                          <input
                            type="text"
                            defaultValue={ note.info }
                            onChange={ e => {
                              const newNotes = newNotesState(notes, topic, index, 'info', e.target.value);
                              this.setState({ notes: newNotes });
                              writeNotes(newNotes, decryptor);
                            } }
                          />
                        </span> :
                        <div className="inset" key={ index }>
                          <p>
                            <strong>{ note.name }:  </strong>
                            { note.info }
                            <i
                              className="fa fa-pencil"
                              onClick={ () => { this.setState({ editable: [topic, note.name].join('-') }) } }
                            />
                          </p>
                        </div>
                    ))
                  }
                  <br />
                </div>
              ))
            }
          </div>
        </div>
      )
    } else {
      return (
        <div className="row container">
          <input
            type="password"
            onChange={ (e) => {
              debounceDecryptorChange(dispatch, e.target.value)
            } }
          />
        </div>
      )
    }
  }
};

const mapStateToProps = state => ({
  notes: state.notes,
  decryptor: state.decryptor
});

export default connect(mapStateToProps)(Notes);

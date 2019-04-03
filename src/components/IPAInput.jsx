
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class IPAInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }

    let keymap = {};
    keymap['a'] = ['ɑ', 'æ', 'ɐ', 'ɑ̃'];
    keymap['b'] = ['β', 'ɓ', 'ʙ'];
    keymap['c'] = ['ɕ', 'ç'];
    keymap['d'] = ['ð', 'd͡ʒ', 'ɖ', 'ɗ'];
    keymap['e'] = ['ə', 'ɚ', 'ɵ', 'ɘ'];
    keymap['f'] = ['͡', '͜', '‿'];
    keymap['g'] = ['ɠ', 'ɢ', 'ʛ', 'ɡ'];
    keymap['h'] = ['ɥ', 'ɦ', 'ħ', 'ɧ', 'ʜ'];
    keymap['i'] = ['ɪ', 'ɪ̈', 'ɨ'];
    keymap['j'] = ['ʝ', 'ɟ', 'ʄ'];
    keymap['k'] = ['ǀ', 'ǁ', 'ǂ', 'ǃ', 'ʘ'];
    keymap['l'] = ['ɫ', 'ɬ', 'ʟ', 'ɭ', 'ɮ'];
    keymap['m'] = ['ɱ'];
    keymap['n'] = ['ŋ', 'ɲ', 'ɴ', 'ɳ'];
    keymap['o'] = ['ɔ', 'œ', 'ø', 'ɒ', 'ɔ̃', 'ɶ'];
    keymap['p'] = ['ɸ'];
    keymap['q'] = ['ˈ', 'ˌ'];
    keymap['r'] = ['ɾ', 'ʁ', 'ɹ', 'ɻ', 'ʀ', 'ɽ', 'ɺ'];
    keymap['s'] = ['ʃ', 'ʂ'];
    keymap['t'] = ['θ', 't͡ʃ', 't͡s', 'ʈ'];
    keymap['u'] = ['ʊ', 'ʊ̈', 'ʉ'];
    keymap['v'] = ['ʌ', 'ʋ', 'ⱱ'];
    keymap['w'] = ['ʍ', 'ɯ', 'ɰ'];
    keymap['x'] = ['χ'];
    keymap['y'] = ['ʎ', 'ɣ', 'ʏ', 'ɤ'];
    keymap['z'] = ['ʒ', 'ʐ', 'ʑ'];
    keymap['0'] = ['∅'];
    keymap['1'] = ['|', '‖'];
    keymap['2'] = ['ʔ', 'ʕ', 'ʢ', 'ʡ'];
    keymap['3'] = ['ɛ', 'ɜ', 'ɝ', 'ɛ̃', 'ɞ'];
    keymap['4'] = ['’', 'ˈ'];
    keymap['5'] = ['“', '”'];
    keymap['6'] = ['–', '—'];
    keymap['/'] = ['|', '‖'];
    keymap['\''] = ['’', 'ˈ'];
    keymap[','] = ['ˈ', 'ˌ', 'ʼ'];
    keymap['.'] = ['ː', 'ˑ', '̆ '];
    this.keymap = keymap
    this.currentCharacter = null;
    this.currentCharacterIndex = null;
    this.currentCharacterLength = 0;
    this.modificationKey = 'ctrlKey';
    this.cursorPosition = 0;

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.insert = this.insert.bind(this);
    this.ipaInput = React.createRef();
  }

  insert(ch) {
    this.setState({value: this.state.value + ch});
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleKeyDown(e) {
    if (e[this.modificationKey] && this.keymap[e.key]) {
      let newValue;
      let cursorPosition;
      if (this.currentCharacter === e.key) {
        const oldCharacter = this.keymap[e.key][this.currentCharacterIndex];
        this.currentCharacterIndex = (this.currentCharacterIndex + 1) % this.keymap[e.key].length;
        const newCharacter = this.keymap[e.key][this.currentCharacterIndex];
        newValue = 
          this.state.value.substring(0, e.target.selectionStart-this.currentCharacterLength)
          + newCharacter
          + this.state.value.substring(e.target.selectionStart);
        this.currentCharacterLength = newCharacter.length;
        cursorPosition = e.target.selectionStart + newCharacter.length - oldCharacter.length;
      } else {
        this.currentCharacter = e.key;
        this.currentCharacterIndex = 0;
        const newCharacter = this.keymap[e.key][this.currentCharacterIndex];
        newValue = 
          this.state.value.substring(0, e.target.selectionStart)
          + newCharacter
          + this.state.value.substring(e.target.selectionStart);
        this.currentCharacterLength = newCharacter.length;  
        cursorPosition = e.target.selectionStart + newCharacter.length;
      }

      this.setState({value: newValue}, (e) => {
        this.ipaInput.current.selectionStart = cursorPosition;
        this.ipaInput.current.selectionEnd = cursorPosition;
      });
      e.stopPropagation();
      e.preventDefault();
      e.returnValue = false;
      return false;
    } else {
      this.currentCharacter = null;
      this.currentCharacterIndex = null;
    }
  }

  render() {
    return (
      <input ref={this.ipaInput} type="text" value={this.state.value} onKeyDown={this.handleKeyDown} onChange={this.handleChange} placeholder="Your Answer"/>
    );
  }
}

export default IPAInput;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import omit from 'lodash/omit';
import uniqueid from 'lodash/uniqueid';
import debounce from 'lodash/debounce';

import './Input.css';

export default class Input extends Component {
  static propTypes = {
    errorText: PropTypes.string,
    hint: PropTypes.string,
    inputLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    inputMargin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    showSuccessMessage: PropTypes.bool,
    type: PropTypes.string,
    valid: PropTypes.bool
  };

  static defaultProps = {
    errorText: 'This field is required',
    hint: '',
    required: true,
    type: 'text',
    valid: true,
    onChange: () => {}
  };

  constructor(props) {
    super(props);
    this.id = uniqueid('input-');
  }

  debounceOnChange = debounce(this.props.onChange, 150, {maxWait: 200});

  render() {
    const {label, required, hint, valid, errorText, inputLength, inputMargin, showSuccessMessage} = this.props;
    const props = omit(this.props, ['className', 'type', 'label', 'required', 'hint', 'valid', 'errorText', 'inputLength', 'inputMargin', 'showSuccessMessage']);
    const invalidClass = valid ? '' : 'invalid';
    const margin = inputMargin ? inputMargin : (label ? '0 0 30px 0' : '0');

    return (
      <div style={{width: inputLength, margin: margin}} className={`group ${invalidClass}`}>
        <input id={this.id}
               required={required}
               className={'input'}
               type={this.props.type}
               onChange={this.debounceOnChange}
               {...props} />
        {hint &&
          <label
            htmlFor={this.id}
            className={'hint'}>
            {hint}
          </label>
        }
        {label &&
          <label
            htmlFor={this.id}
            className={'label'}>
            {label}
          </label>
        }
        <i className={'bar'} />
        {!valid &&
          <div className="errorText">{errorText}</div>
        }
        {showSuccessMessage && valid &&
          <div className="successText">{errorText}</div>
        }
      </div>
    );
  }
}

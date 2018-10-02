import React, { Component } from 'react';
// import { render as reactDomRender } from 'react-dom';
import PropTypes from 'prop-types';
import Flatpickr from 'flatpickr';

// import DatePresets from './DatePresets';

import 'flatpickr/dist/themes/material_blue.css';
import './DateTimePicker.css';
import '../Input/Input.css';

class DateTimePicker extends Component {
  constructor(props) {
    super(props);

    this.pickerRef = null;
  }

  static propTypes = {
    id: PropTypes.string,
    defaultDate: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string])), PropTypes.string]),
    displayFormat: PropTypes.string, //formats -- https://flatpickr.js.org/formatting/
    enableTime: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    mode: PropTypes.oneOf(['multiple', 'range', 'single']),
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    presets: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      start: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
      end: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string])
    })),
    time24hr: PropTypes.bool,
    wrapperClass: PropTypes.string,
    inputClass: PropTypes.string,
    localeLang: PropTypes.shape({
      code: PropTypes.string
    })
  };

  static defaultProps = {
    firstDayOfWeek: 1,
    defaultDate: [new Date()]
  };

  componentDidMount() {
    const { enableTime, defaultDate, firstDayOfWeek, onChange, onClose, onOpen, time24hr, presets, mode, displayFormat, localeLang } = this.props;

    const options = {
      enableTime,
      defaultDate,
      locale: {
        firstDayOfWeek
      },
      onChange,
      onClose,
      onOpen,
      wrap: true,
      'time_24hr': time24hr
    };

    if (mode || presets) {
      options.mode = presets ? 'range' : mode;
    }

    if (displayFormat) {
      options.altFormat = displayFormat;
      options.altInput = true;
    }

    this.flatpickr = new Flatpickr(this.pickerRef, options);

    // if (presets) {
    //   const presetsContainer = document.createElement('div');
    //   presetsContainer.className = `${styles.calendarPresets}`;
    //
    //   this.flatpickr.calendarContainer.append(presetsContainer);
    //   reactDomRender(<DatePresets presets={presets} onItemClick={this.handlePresetClick}/>, presetsContainer);
    // }
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
  }

  handlePresetClick = (value) => {
    const { presets, onChange } = this.props;

    const selected = presets.find((item) => item.label === value);
    if (selected.start.toDate) {
      selected.start = selected.start.toDate()
    }
    if (selected.end.toDate) {
      selected.end = selected.end.toDate()
    }
    const newDates = [selected.start, selected.end];

    this.flatpickr.setDate(newDates);
    onChange(newDates);
    this.flatpickr.close();
  };

  assignRef = (node) => this.pickerRef = node;

  render() {
    const { id, inputClass, wrapperClass, label, labelClass, barClass } = this.props;
    return (
      <div ref={this.assignRef} className={`pickerWrapper ${wrapperClass}`}>
        <input data-input className={`input datepicker-input} ${inputClass}`} id={id}/>
        {label &&
        <label htmlFor={id} className={labelClass}>{label}</label>
        }
        {barClass &&
        <i className={barClass}/>
        }
      </div>
    );
  }
}

export default DateTimePicker;

import React from 'react';
import Select from 'react-select';

class AutoComplete extends React.Component {
  state = {
    selectedOption: '',
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      // console.error(`Selected: ${selectedOption.label}`);
      this.props.updateOnOrderCode(selectedOption.label,this.props.auntoCompleteRowId);
      this.props.matchProductDescription(selectedOption,this.props.auntoCompleteRowId);
      this.props.matchProductPrice(selectedOption,this.props.auntoCompleteRowId);
    }
  }

  generateOptions = () => {
    const options = [];
    for (let i = 0; i < this.props.products.length; i++) {
      options.push({ value: `${this.props.products[i].code}`, label: `${this.props.products[i].code}`});
    };
    return options;
  }

  // options data formart: options= {[{ value: 'one', label: 'One' }]}

  render () {
    const { selectedOption } = this.state;
    return (
      <Select
        name="form-field-name"
        value={selectedOption}
        onChange={this.handleChange}
        options={this.generateOptions()}
      />
    );
  }
}

export default AutoComplete;
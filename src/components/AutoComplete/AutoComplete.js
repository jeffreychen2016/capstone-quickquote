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
      console.error(`Selected: ${selectedOption.label}`);
    }
  }

  generateOptions = () => {
    const options = [];
    for (let i = 0; i < this.props.products.length; i++) {
      options.push({ value: `${this.props.products[i].code}`, label: `${this.props.products[i].code}`});
    };
    console.error(options);
  }

  render () {
    const { selectedOption } = this.state;
    console.error(this.generateOptions());
    return (
      <Select
        name="form-field-name"
        value={selectedOption}
        onChange={this.handleChange}
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
      />
    );
  }
}

export default AutoComplete;

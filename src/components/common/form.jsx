import Joi from "joi-browser";
import React, { Component } from "react";
import Dropdown from "./dropdown";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    console.log(errors);
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const error = this.validateProperty(input);
    if (error) {
      errors[input.name] = error;
    } else {
      delete errors[input.name];
    }
    const updatedValue = input.value;
    const data = { ...this.state.data };
    data[input.name] = updatedValue;
    this.setState({ data, errors });
  };

  handleSelect = (e) => {
    console.log(e);
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-primary"
        onSubmit={this.handleSubmit}
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderDropdown(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Dropdown
        name={name}
        label={label}
        value={data[name]}
        options={options}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
 
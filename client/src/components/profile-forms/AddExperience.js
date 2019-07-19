import React, { Fragment, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile.js";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, description, current } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Ajout d'expériences</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' />
      </p>
      <small>* obligatoire</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addExperience(formData, history);
        }}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nom du poste occupé'
            name='title'
            required
            value={title}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Entreprise'
            name='company'
            required
            value={company}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Région'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>Depuis Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={current}
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Actuel
          </p>
        </div>
        <div className='form-group'>
          <h4>à Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={e => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Description '
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='./dashboard'>
          retour
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { addExperience }
)(withRouter(AddExperience));

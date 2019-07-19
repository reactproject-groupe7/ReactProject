import React, { useState, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubusername: "",
    youtube: "",
    twitter: "",
    facebook: "",
    instagram: ""
  });

  const [displaySocialInput, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    console.log("submit");
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Créer ton profil</h1>
      <p className='lead'>
        <i className='fas fa-user' />
      </p>
      <small>* = obligatoire</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={e => onChange(e)}>
            <option value='0'>Sélectionne un domaine d'activité</option>
            <option value='Développeur'>Développeur</option>
            <option value='Junior Developpeur'>Junior Developpeur</option>
            <option value='Senior Developpeur'>Senior Developpeur</option>
            <option value='Manager'>Chef de projet</option>
            <option value='Etudiant'>Etudiant</option>
            <option value='Professeur'>Professeurs</option>
            <option value='Passionné'>Passionné</option>
            <option value='Autres'>Autres</option>
          </select>
          <small className='form-text'>* Où en es tu dans ta carrière ?</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Entreprise'
            name='company'
            value={company}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            L'entreprise où tu exerces actuellement
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Site web '
            name='website'
            value={website}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            le site de ton entreprise ou ton site personnel
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Région'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Ville ou région où tu exerces</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Compétences'
            name='skills'
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Utilise des virgules pour séparer vos compétences
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Votre Github'
            name='githubusername'
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Si tu veux que l'on affiche tes derniers dépots github
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='Une petite description de toi '
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Dis nous en plus sur toi </small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInput)}
            type='button'
            className='btn btn-light'>
            Ajoute tes liens de reseaux sociaux
          </button>
          <span />
        </div>

        {displaySocialInput && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Retour
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));

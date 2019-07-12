import React from 'react'
import { Link } from 'react-router-dom';
const Landing = () => {
    return (
       <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Kode KonneXion</h1>
          <p className="lead">
           Créer et consulte des articles liés à la veille Technologiques 
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">S'inscrire</Link>
            <Link to="/login" className="btn btn-light">Connexion </Link>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Landing

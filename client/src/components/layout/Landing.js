import React from 'react'

const Landing = () => {
    return (
       <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Code -> Connects</h1>
          <p className="lead">
           Crée et consulte des articles liés à la progrmamation 
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">S'inscrire</a>
            <a href="login.html" className="btn btn-light">Connexion </a>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Landing

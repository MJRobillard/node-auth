import React from 'react';

function MainSight() {
  return (
    <>
      <ul className="navbar">
        <li className="navbar-elem"><a href="#root"><i className="fa fa-fw fa-home"></i></a></li> 
        <li className="navbar-elem"><a href="#about">About</a></li>
        <li className="navbar-elem"><a href="../public/create.html">Create</a></li>
        <li className="navbar-elem"><a href="../public/clubs.html">Clubs</a></li>
      </ul>

      <section id="root">
        <div className="root-container">
          <div className="title-home-container">
            <h1>Welcome to ClubHub.</h1>
          </div>
          <div className="form-container">
            <form name="login" action="" onsubmit="return " method="post">
              <div className="login-container">
                <h2 style={{ fontWeight: 'bold' }}>Sign in.</h2>
                <input type="text" placeholder="Username" name="uname" required />
                <input type="password" placeholder="Password" name="psw" required />
                <input type="submit" />
              </div>
              <div className="login-container">
                <span className="psw">Don't have an account? <a href="/new_user.html">Sign up here</a></span>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="about-container">
          <h1 style={{ color: 'white' }}>Meet the Team.</h1>
          <h2 style={{ color: 'white' }}>Students at UC Berkeley trying to make your lives easier when choosing clubs.</h2>
        </div>
      </section>
    </>
  );
}

export default MainSight;

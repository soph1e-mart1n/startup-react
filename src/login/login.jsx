import React, { useEffect, useHistory } from 'react';
import './login.scss';

export function Login() {
  useEffect(() => {
    $('.form')
      .find('input, textarea')
      .on('keyup blur focus', function (e) {
        var $this = $(this),
          label = $this.prev('label');

        if (e.type === 'keyup') {
          if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
        } else if (e.type === 'blur') {
          if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.removeClass('highlight');
          }
        } else if (e.type === 'focus') {
          if ($this.val() === '') {
            label.removeClass('highlight');
          } else if ($this.val() !== '') {
            label.addClass('highlight');
          }
        }
      });

    $('.tab a').on('click', function (e) {
      e.preventDefault();
      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');

      var target = $(this).attr('href');

      $('.tab-content > div').not(target).hide();

      $(target).fadeIn(600);
    });

    (async () => {
      const userName = localStorage.getItem('userName');
      if (userName) {
        document.querySelector('#playerName').textContent = userName;
        setDisplay('loginControls', 'none');
        setDisplay('playControls', 'block');
      } else {
        setDisplay('loginControls', 'block');
        setDisplay('playControls', 'none');
      }
    })();

    // Cleanup logic for event listeners

    return () => {
      // Remove event listeners here if needed
    };
  }, []); // Empty dependency array means this effect will run once after the initial render

  const loginUser = async () => {
    await login(`/api/auth/login`);
  };

  const createUser = async () => {
    await create(`/api/auth/create`);
  };

  const login = async (endpoint) => {
    const userName = document.querySelector('#userName')?.value;
    const password = document.querySelector('#userPassword')?.value;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ username: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response.ok) {
      localStorage.setItem('userName', userName);
      history.push('/customize');
    } else {
      const body = await response.json();
      document.querySelector('.errorMessage').textContent = `⚠ Error: ${body.msg}`;
      document.querySelector('.errorPage').className = 'errorPage';
      document.querySelector('.tryAgain').addEventListener('click', function () {
        document.querySelector('.errorPage').className = 'errorPage closed';
      });
    }
  };

  const create = async (endpoint) => {
    const userName = document.querySelector('#userNameCreate')?.value;
    const password = document.querySelector('#userPasswordCreate')?.value;
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ username: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (response.ok) {
      localStorage.setItem('userName', userName);
      history.push('/customize');
    } else {
      const body = await response.json();
      document.querySelector('.errorMessage').textContent = `⚠ Error: ${body.msg}`;
      document.querySelector('.errorPage').className = 'errorPage';
      document.querySelector('.tryAgain').addEventListener('click', function () {
        document.querySelector('.errorPage').className = 'errorPage closed';
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('userName');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
  };

  const setDisplay = (controlId, display) => {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
  };

  const history = useHistory();

  return (
    <div>
      <div id="playControls" className="logout" style="display: none">
        <h1>Welcome <span id="playerName"></span></h1>
        <p className="forgot2"><a onClick={logout}>LOG OUT</a></p>
      </div>

      <div id="loginControls" className="form" style="display: none">
        <ul className="tab-group">
          <li className="tab active"><a href="#signup">Sign Up</a></li>
          <li className="tab"><a href="#login">Log In</a></li>
        </ul>
        <div className="tab-content">
          <div id="signup">
            <h1>Sign Up</h1>
            <div className="top-row">
              <div className="field-wrap">
                <label>
                  First Name<span className="req">*</span>
                </label>
                <input type="text" required />
              </div>
              <div className="field-wrap">
                <label>
                  Last Name<span className="req">*</span>
                </label>
                <input type="text" required />
              </div>
            </div>
            <div className="field-wrap">
              <label>
                Username<span className="req">*</span>
              </label>
              <input type="username" required id="userNameCreate" />
            </div>
            <div className="field-wrap">
              <label>
                Set A Password<span className="req">*</span>
              </label>
              <input type="password" required id="userPasswordCreate" />
            </div>
            <button className="button button-block" onClick={createUser}>Get Started</button>
          </div>

          <div id="login">
            <h1>Welcome Back!</h1>
            <div className="field-wrap">
              <label>
                Username<span className="req">*</span>
              </label>
              <input type="username" required id="userName" />
            </div>
            <div className="field-wrap">
              <label>
                Password<span className="req">*</span>
              </label>
              <input type="password" required id="userPassword" />
            </div>
            <button className="button button-block" onClick={loginUser}>Log In</button>
          </div>
        </div>
      </div>

      <div className="errorPage closed">
        <h1>ERROR!</h1>
        <p className="errorMessage">error message here</p>
        <button type="button" role="button" className="tryAgain btn btn-info" onClick="close()">Close</button>
      </div>

      <div className="footer">
        <a href="https://github.com/soph1e-mart1n/startup.git">GitHub</a>
      </div>
    </div>
  );
}

export default Login;

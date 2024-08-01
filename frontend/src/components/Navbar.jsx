import React from 'react'
import Profile from './Profile'

function Navbar({btnSignup ,isChat,isDashboard, btnLogin , btnLogout , profile}) {
  
  return (
    <><div className="navbar bg-base-300 relative ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <div className={profile=="none "? "hidden": "md:hidden flex  "  }  ><a href="/profile"><Profile></Profile></a></div>
  
        <a  className="btn  md:hidden btn-accent ml-1 ring my-2 mr-1" href="/dashboard"><li className={(btnLogout == "none" ) || isDashboard ? "hidden": "btn ring my-2  btn-accent ml-1 mr-1"  }  >Dashboard</li> </a>
        <a  className="btn  md:hidden btn-accent ml-1 ring my-2 mr-1" href="/login"><li className={btnLogin == "none" ? "hidden" : "btn ring my-2   btn-accent ml-1 mr-1"}>Se Connecter</li></a>
        <a  className="btn  md:hidden btn-accent ml-1 ring my-2 mr-1" href="/chat"><li className={btnLogout == "none" || isChat  ? "hidden" : "btn ring my-2  btn-accent ml-1 mr-1"}>💬</li></a>
        <a  className="btn  md:hidden btn-accent ml-1 ring my-2 mr-1" href="signup"><li className={btnSignup=="none" ? "hidden": "btn ring my-2  btn-accent ml-1 mr-1"  }  >S'Inscrire</li></a>
        <a className="btn  md:hidden btn-accent ml-1 ring my-2 mr-1" href="insertAd">Publier Une Annonce</a>
        
        <a href="/logout"><li className={btnLogout == "none"? "hidden": "btn ring my-2  btn-accent ml-1 mr-1"  }  >Se Deconnecter</li></a>
      
        </ul>
    </div>
    <a className="btn btn-ghost text-xl" href="/">Biens Immobiliers</a>
  </div>
  <div className="navbar-center hidden md:flex">
  <div className={profile=="none "? "hidden": "mx-1"  }  ><a href="/profile"><Profile></Profile></a></div>
  
  </div>
      
  <div className="navbar-end">
  <ul className="menu menu-horizontal px-1 lg:flex flex-row flex-nowrap justify-center  hidden">
      <li className={btnLogout == "none"? "hidden": "btn  btn-accent ml-1 mr-1"  }  ><a href="/logout">Se Deconnecter</a></li>
      
      <li className={btnLogin == "none" ? "hidden" : "btn  btn-accent ml-1 mr-1"}><a href="/login">Se Connecter</a></li>
      <li className={btnLogout == "none" || isChat  ? "hidden" : "btn  btn-accent ml-1 mr-1"}><a href="/chat">💬</a></li>
      <li className={btnSignup=="none" ? "hidden": "btn  btn-accent ml-1 mr-1"  }  ><a href="signup">S'Inscrire</a></li>
      <li className={(btnLogout == "none" ) || isDashboard ? "hidden": "btn  btn-accent ml-1 mr-1"  }  ><a href="/dashboard">Dashboard</a></li>
      <a className="btn hidden lg:flex btn-accent ml-1 mr-1" href="insertAd">Publier Une Annonce
    </a>
    </ul>
    
  </div>
</div>

</>
  )
}

export default Navbar

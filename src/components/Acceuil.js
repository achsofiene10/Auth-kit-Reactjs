import React from 'react';
import {useState,useEffect} from 'react';

 function Acceuil(props) {
    

    return (
      <div>
          Home Page
      <button
        onClick={() => {
              props.history.push("/login");
              localStorage.removeItem('token');
        }}
      >
        Logout
      </button>
</div>
    );
  }


export default Acceuil;




import Parse from 'parse/dist/parse.min.js';
import React, { createContext, useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

const Auth = {
  isAuthenticated: false,
  signin(cb) {
    Auth.isAuthenticated = true;
    if (cb) cb();  // Asegurarse de que cb no sea undefined antes de llamarlo
  },
  signout(cb) {
    Auth.isAuthenticated = false;
    if (cb) cb();  // Asegurarse de que cb no sea undefined antes de llamarlo
  }
};




const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Comprobar si hay un usuario autenticado al cargar el componente
    const fetchUser = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        setUser(currentUser);
      }
    };
    fetchUser();
  }, []);

  const signin = (cb) => {
    console.log("Attempting to sign in"); // Log para depuración
    Auth.signin(() => {
      setUser(Parse.User.current());
      console.log("User set:", Parse.User.current()); // Log para depuración
      if (cb) cb();
    });
  };

  const signout = (cb) => {
    Auth.signout(() => {
      setUser(null);
      if (cb) cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

export function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulando un tiempo de espera de 1 segundo

      setLoading(false);
    }

    checkAuth();
  }, []);

  if (loading) {
    return <div className='App-header'><h1>Loading...</h1></div>; // Puedes mostrar un spinner o un mensaje de carga mientras se verifica la autenticación
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

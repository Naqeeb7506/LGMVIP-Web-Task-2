import React, { useState } from "react";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import Navbar from "./components/Navbar";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  //
  const fetUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://reqres.in/api/users?page=1");
      const data = await res.json();
      console.log(data, res.status);
      //
      if (res.status === 200) {
        // since the API load time is very less, I have added a settimeout function to show the loader
        setTimeout(() => {
          setUsers(data.data);
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <nav className="container-fluid p-2 bg-primary">
        <div className="container d-flex align-items-center justify-content-between p-0">
          <div className="logo">
            <h1 className="text-white">Brand</h1>
          </div>
          <div>
            <button className="btn btn-secondary" onClick={fetUsers}>
              Get users
            </button>
          </div>
        </div>
      </nav>

      <div className="container p-2 mt-4">
        {loading ? (
          <div className="d-flex align-items-center justify-content-center gap-2">
            <h2 className="text-black">Loading</h2>
            <div className="spinner-border text-black" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row align-items-center justify-content-start">
            {users.map((item, index) => {
              return (
                <div className="col-lg-4 col-sm-6" key={index}>
                  <div className="card bg-secondary mb-4">
                    <div className="card-header">
                      <h2 className="mb-0">User {item.id}</h2>
                    </div>
                    <div className="card-body">
                      <div className="avatar">
                        <img src={item.avatar} alt="" />
                      </div>
                      <div>
                        <h2 className="card-title mb-0">
                          {item.first_name} {item.last_name}
                        </h2>
                        <p className="card-text">{item.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default App;

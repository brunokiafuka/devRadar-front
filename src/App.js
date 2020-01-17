import React, { useEffect, useState } from "react";
import api from "./service/api";
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

function App() {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [github_username, setGithubname] = useState();
  const [techs, setTechs] = useState();
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log(position);
        setLat(latitude);
        setLong(longitude);
      },
      err => console.log(err),
      { timeout: 30000 }
    );
  }, []);

  useEffect(() => {
    async function loadDevs() {
      const res = await api.get("/dev");

      setDevs(res.data.devs);
    }

    loadDevs();
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post("/dev", {
      github_username,
      techs,
      lat,
      long
    });

    setGithubname("");
    setTechs("");

    setDevs([...devs, response.data.dev]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Register</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Github user name</label>
            <input
              type="text"
              name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={e => setGithubname(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Techs</label>
            <input
              type="text"
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="lat">Latitude</label>
              <input
                type="number"
                name="lat"
                id="lat"
                required
                value={lat}
                onChange={e => setLong(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="long">Longitude</label>
              <input
                type="number"
                name="long"
                id="long"
                required
                value={long}
                onChange={e => setLong(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Save</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <li key={dev._id} className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(", ")}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.github_username}`}>
                View profile
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

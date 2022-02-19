import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const url = "http://localhost:9900";
  const [user, setUser] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(url);
    if (res) {
      setUser(res.data.data);
    }
  };

  const socket = io(url);

  socket.on("observer", (data) => {
    console.log(data);

    setUser([...user, data]);
  });

  socket.on("observerDelete", (data) => {
    const res = user.filter((el) => el._id !== data);
    setUser(res);
  });

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>
          {user?.map(({ _id, name, course }) => (
            <div key={_id}>
              <div>{name}</div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

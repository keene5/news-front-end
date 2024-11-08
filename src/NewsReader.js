import React, { useState, useEffect } from "react";
import { QueryForm } from "./QueryForm";
import { Articles } from "./Articles";
import { exampleQuery, exampleData } from "./data";
import { SavedQueries } from "./SavedQueries";
import { LoginForm } from "./LoginForm";
import "./App.css"; // Make sure to import your CSS

export function NewsReader() {
  const [query, setQuery] = useState(exampleQuery);
  const [data, setData] = useState(exampleData);
  const [queryFormObject, setQueryFormObject] = useState({});
  const urlNews = "/api/postNews";
  const urlQueries = "/api/getAllQueries";
  const urlUsersAuth = "/api/authenticate";

  const [savedQueries, setSavedQueries] = useState([]);

  async function getNews(queryObject) {
    if (queryObject.q) {
      try {
        const response = await fetch(urlNews, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(queryObject),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    } else {
      setData({});
    }
  }

  const [currentUser, setCurrentUser] = useState(null);
  const [credentials, setCredentials] = useState({ user: "", password: "" });

  useEffect(() => {
    getNews(query);
  }, [query]);

  useEffect(() => {
    getQueryList();
  }, []);

  async function getQueryList() {
    try {
      const response = await fetch(urlQueries);
      if (response.ok) {
        const data = await response.json();
        console.log("savedQueries has been retrieved: ");
        setSavedQueries(data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  async function login() {
    if (currentUser !== null) {
      setCurrentUser(null);
    } else {
      try {
        const response = await fetch(urlUsersAuth, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        if (response.status === 200) {
          setCurrentUser({ ...credentials });
          setCredentials({ user: "", password: "" });
        } else {
          alert("Failed Login Attempt!");
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
        setCurrentUser(null);
      }
    }
  }

  async function saveQueryList(savedQueries) {
    try {
      const response = await fetch(urlQueries, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savedQueries),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("savedQueries array has been persisted:");
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  function onSavedQuerySelect(selectedQuery) {
    setQueryFormObject(selectedQuery);
    setQuery(selectedQuery);
  }

  function currentUserMatches(user) {
    return currentUser && currentUser.user === user;
  }

  function onFormSubmit(queryObject) {
    if (currentUser === null) {
      alert("Log in if you want to create new queries!");
      return;
    }

    if (savedQueries.length >= 3 && currentUserMatches("guest")) {
      alert("guest users cannot submit new queries once saved query count is 3 or greater!");
      return;
    }

    let newSavedQueries = [];
    newSavedQueries.push(queryObject);
    for (let query of savedQueries) {
      if (query.queryName !== queryObject.queryName) {
        newSavedQueries.push(query);
      }
    }
    console.log(JSON.stringify(newSavedQueries));
    saveQueryList(newSavedQueries);
    setSavedQueries(newSavedQueries);
    setQuery(queryObject);
  }

  return (
    <div>
      <div className="main-container">
        <div className="login-box">
          <LoginForm
            login={login}
            credentials={credentials}
            currentUser={currentUser}
            setCredentials={setCredentials}
          />
        </div>
        <section className="parent">
          <div className="box">
            <span className="title">Query Form</span>
            <QueryForm
              currentUser={currentUser}
              setFormObject={setQueryFormObject}
              formObject={queryFormObject}
              submitToParent={onFormSubmit}
              setSavedQueries={setSavedQueries}
              setData={setData}
              exampleQuery={exampleQuery}
            />
          </div>
          <div className="box">
            <span className="title">Saved Queries</span>
            <SavedQueries
              savedQueries={savedQueries}
              selectedQueryName={query.queryName}
              onQuerySelect={onSavedQuerySelect}
              setSavedQueries={setSavedQueries}
              setData={setData}
              currentUser={currentUser}
            />
          </div>
          <div className="box">
            <span className="title">Articles List</span>
            <Articles query={query} data={data} />
          </div>
        </section>
      </div>
    </div>
  );
}
import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [answerWithrecursion, setanswerWithrecursion] = React.useState();
  const [answerWithoutrecursion, setanswerWithoutrecursion] = React.useState();

  const submit = async () => {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ data }),
    };
    await fetch("/api", init)
      //I've put an async on the then function to await for the response, otherwise it just response with an empty body
      .then(async (response) => {
        const body = await response.json();
        console.log(body);
        setanswerWithrecursion(body.WithRecursion);
        setanswerWithoutrecursion(body.WithoutRecursion);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div className="container">
        <h1> Please enter a number</h1>
        <input type="number" onChange={(e) => setData(e.target.value)} />
        <button onClick={submit}>button</button>
      </div>
      {data ? <h1>The Collatz sequence of {data} is:</h1> : null}
      <div className="answer-container">
        {/* Mapping the Function with Recurrsion answers */}
        {answerWithrecursion ? <p>Answers with Recurrsion: </p> : null}
        <div className="answer-container">
          {" "}
          {answerWithrecursion
            ? answerWithrecursion.map((i) => {
                return <p key={i}>{i}</p>;
              })
            : null}
        </div>
        <div className="answer-container">
              {/* Mapping the Function without Recurrsion  */}

          {answerWithoutrecursion ? <p>Answers without Recurrsion: </p> : null}
          {answerWithoutrecursion
            ? answerWithoutrecursion.map((i) => {
                return <p key={i}>{i}</p>;
              })
            : null}{" "}
        </div>
      </div>
    </div>
  );
}

export default App;

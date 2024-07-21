import React, { useState , useCallback ,useEffect } from "react";
// callback hook is used here because multiple times 
// same type of functions have been repeated and hence
//  callback is used to re-render such functions. 
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const GeneratePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (char) str += "!@#$%^&*()_+-=[]{}|;:',.<>?";
    const passwordArray = Array.from({ length }, () =>
      str[Math.floor(Math.random() * str.length)]
    );
    setPassword(passwordArray.join(""));
  }, [length, numberAllowed, char]);

// this useeffect is being used when any of the lenght , number or char are being changed 
// then a new password is generated 
useEffect(()=> {GeneratePassword('')}, [length, numberAllowed , char])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
        />
        <button
          className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0"
          onClick={GeneratePassword}
        >
          Generate
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label htmlFor="length"> Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="number"> Numbers </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={char}
            onChange={() => setChar((prev) => !prev)}
          />
          <label htmlFor="char"> Special Characters </label>
        </div>
      </div>
    </div>
  );
}

export default App;

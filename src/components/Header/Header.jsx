import React, {useState, useEffect} from 'react'

const Header = () => { 
  const [mode, setMode] = useState('light');
  const handleClick = () => {
    setMode(mode === "dark" ? "light" : "dark");
  }

  useEffect(() => {
    const localMode = localStorage.getItem('mode') || "light";
    setMode(localMode);
  }, [])

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode])

  if (mode === "dark") {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  return (
    <header>
      <nav className="nav">
        <h1>Where in the World?</h1>
        <div onClick={handleClick} className="mode-toggler">
          <button className="circle"></button>  
        </div>
      </nav>
    </header>
  )
}

export default Header

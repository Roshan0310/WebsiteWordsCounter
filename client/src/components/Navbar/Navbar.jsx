import React from 'react'

function Navbar() {
  return (
    <div className=''>


<nav class="navbar navbar-expand-lg navbar-light " style={{background:"lightgray",height:"50px"}}>
  <div class="container-fluid">
    <a class="navbar-brand" href='/home' style={{fontWeight:"bold"}} >Counter</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      
    </div>
  </div>
</nav>


    </div>
  )
}

export default Navbar
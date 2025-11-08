import { useState } from 'react'
import '../App.css'
import Surface from '../components/surface' 
import Sky from '../components/sky'
import Profile from '../components/profile'
import MusicPlayer from '../components/musicPlayer'
import BlogPaper from '../components/blogPaper'
import Projects from '../components/projects'
import Title from '../components/Title'

function Home() {
  return (
    <>
      <Surface/>
      <Sky/>
      <Title/>
      <div className="page-container">
        <div className="profile-container">
          <Profile/>
        </div>
        <div className="content-container">
          <MusicPlayer/>
          <BlogPaper/>
          <Projects/>
        </div>
      </div>
    </>
  )
}

export default Home
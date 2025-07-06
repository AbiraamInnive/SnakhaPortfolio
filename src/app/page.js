import Slider from '@components/slider'
import Projects from '@components/projects'
import Header from '@components/header'
import AboutMe from '@components/aboutMe'

export default function Home() {
  return (
    <main className="">
      <Header />
      <Slider />
      <Projects />
      <AboutMe />
    </main>
  )
}
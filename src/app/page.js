import ThemeToggle from '@components/themeToggle'
import Slider from '@components/slider'
export default function Home() {
  return (
    <main className="">
      <div className='bg-[#f2f5f9] header p-8 px-30 m-auto flex'>
        <span className='w-1/2 text-4xl'>SNAKHA RANJAN<span className='ml-10 text-lg'> Architect | Interior Designer | 3D Visualiser</span></span>

        <div className='w-1/2 flex space-x-10 items-end justify-end'>
          <span>Projects</span>
          <span>Clients</span>
          <span>About me</span>
          <ThemeToggle />
        </div>
      </div>
      <Slider />

    </main>
  )
}
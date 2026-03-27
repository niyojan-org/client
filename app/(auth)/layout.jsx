
import React from 'react'
import Footer from './components/Footer'

const layout = ({ children }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center pb-4 sm:pb-6 w-full">
      <div className="flex-1 h-full w-full max-w-md sm:bg-card rounded-lg sm:my-14">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default layout
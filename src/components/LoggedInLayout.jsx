import React from 'react'
import Nav from './nav/Nav'

function LoggedInLayout({children}) {
  return (
    <>
      <Nav></Nav>
      {children}
    </>
  )
}

export default LoggedInLayout

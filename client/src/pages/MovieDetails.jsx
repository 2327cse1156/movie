import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyShowsData } from '../assets/assets';
const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = React.useState(null);

  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id)
    setShow({
      movie: show,
      dateTime:dummyDateTimeData
    })
  }
  useEffect(() => {
    getShow();
  }, [id])
  return (
    <div></div>
  )
}

export default MovieDetails
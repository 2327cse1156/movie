const Title = ({text1,text2}) => {
  return (
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
        {text1} <span className="bg-gradient-to-r from-primary to-sky-400 text-transparent bg-clip-text">{text2}</span>
    </h1>
  )
}

export default Title
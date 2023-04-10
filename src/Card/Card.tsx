interface Props {
    loginNameTwitter:string
}

function Card(props:Props) {
  const { loginNameTwitter : twitterAccount } =  props
  return (
    <div className="Card-container">
        <p>{twitterAccount}</p>
    </div>
  )
}

export default Card
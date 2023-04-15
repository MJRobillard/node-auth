const Club = ({ title, body, urlOfClub, id }) => {
    console.log(id, title, body, urlOfClub)
    return <div style={{ textAlign: 'left', marginBottom: '12px'}}>
      <h3>
        {title}
      </h3>
      <p>{body}</p>
      <p>{urlOfClub}</p>
    </div>
  }
  
  export default Club;
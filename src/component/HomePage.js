
const HomePage = () => {
  const hpImage=process.env.PUBLIC_URL+'/hp.jpg';
  return (<>
    <div class="ui segment">
      <div class="ui two column very relaxed grid">
        <div class="column">
          <img class="ui fluid image" src={hpImage} alt="Welcome Image" />
        </div>
        <div class="column">
          <h1>welcome to my recipes website</h1>
          <h2>Discover and share delicious recipes</h2>
          <p>Explore a variety of delicious recipes and start cooking today.</p>
          <p>Try your favorite recipes and contribute your own!</p>
        </div>
      </div>
      <div class="ui vertical divider">
      </div>
    </div>

  </>);
}

export default HomePage;
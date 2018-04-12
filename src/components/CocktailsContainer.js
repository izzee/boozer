import React from 'react'
import CocktailDetails from './CocktailDetails'

let URL = 'http://localhost:3000/api/v1/cocktails/'

class CocktailsContainer extends React.Component {

  state = {
    cocktails : [],
    details : null
  }

  componentDidMount = () => {
    fetch(URL)
      .then(res => res.json())
      .then(res => this.setState({cocktails : res}))
  }

  handleClick = e => {
    fetch(URL + e.currentTarget.id)
      .then(res => res.json())
      .then(res => this.setState({details : res}))
  }

  renderDetails = () => {
    if(this.state.details){ return <CocktailDetails details={this.state.details} />}
  }

  renderCocktailNames = () => {
    return this.state.cocktails.map(cocktail => <li key={cocktail.id} id={cocktail.id} onClick={this.handleClick}>{cocktail.name}</li>)
  }

  render(){
    return(
      <div id="main-container">
        <div id="top-bar">
          <h1 id="cocktail-title">Cocktails</h1>
        </div>
        <div id="main-content">
          <ul id = "cocktail-list">
            {this.renderCocktailNames()}
          </ul>
          <div id = "details-container">
            {this.renderDetails()}
          </div>
        </div>
      </div>
    )
  }
}

export default CocktailsContainer

import React from 'react'
import CocktailDetails from './CocktailDetails'
import AddCocktail from './AddCocktail'

let URL = 'http://localhost:3000/api/v1/cocktails/'

class CocktailsContainer extends React.Component {

  state = {
    cocktails : [],
    details : null,
    addCocktail : false
  }

  componentDidMount = () => {
    fetch(URL)
      .then(res => res.json())
      .then(res => this.setState({cocktails : res}))
  }

  handleClick = e => {
    this.setState({addCocktail : false})
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

  addACocktail = () => {
    this.setState({details : null})
    this.setState({addCocktail : !this.state.addCocktail})
  }

  renderAddForm = () => {
    if(this.state.addCocktail){return <AddCocktail />}
  }

  render(){
    return(
      <div id="main-container">
        <div id="top-bar">
          <h1>Cocktails</h1>
          <p onClick={this.addACocktail}>ADD A COCKTAIL</p>
        </div>
        <div id="main-content">
          <ul id = "cocktail-list">
            {this.renderCocktailNames()}
          </ul>
          {this.renderDetails()}
          {this.renderAddForm()}
        </div>
      </div>
    )
  }
}

export default CocktailsContainer

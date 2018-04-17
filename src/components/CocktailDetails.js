import React from 'react'

class CocktailDetails extends React.Component {

  favoriteButton = () => {
    this.props.addToFavorites(this.props.details)
  }

  heartColor = () => {
    if (this.props.favorites.find(cocktail => cocktail.id === this.props.details.id)){
      return true
    }

  }


  renderDetails = () => {

    return <div className="details-container">
      <button
        className="favoriteButton"
        onClick={this.favoriteButton}
        style={{color: this.heartColor() ? 'red' : null }}>
        ♥
      </button>
      <h4>{this.props.details.name}</h4>
      <p>{this.props.details.description}</p>
      <h4>INGREDIENTS:</h4>
      <ul>{this.renderIngredients()}</ul>
      <h4>INSTRUCTIONS:</h4>
      <p>{this.props.details.instructions}</p>
      <p>{this.props.details.source}</p>
    </div>
  }

  renderIngredients = () => {
    return this.props.details.proportions.map(
      proportions => <li key={proportions.id}>{proportions.amount} : {proportions.ingredient_name}</li>
    )
  }

  render(){
    return(
      <div >{this.renderDetails()}</div>
    )
  }

}

export default CocktailDetails

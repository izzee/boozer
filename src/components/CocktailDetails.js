import React from 'react'

class CocktailDetails extends React.Component {

  renderDetails(){
    return <div id="cocktail-details">
        <h3>{this.props.details.name}</h3>
        <p id="cocktail-description">{this.props.details.description}</p>
        <h4>INGREDIENTS:</h4>
        <ul>{this.renderIngredients()}</ul>
        <h4>INSTRUCTIONS:</h4>
        <p>{this.props.details.instructions}</p>

      </div>
  }

  renderIngredients(){
    return this.props.details.proportions.map(
      proportions => <li key={proportions.id}>{proportions.amount} {proportions.ingredient_name}</li>
    )
  }

  render(){
    return(
      <div>{this.renderDetails()}</div>
    )
  }

}

export default CocktailDetails

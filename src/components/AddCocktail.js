import React from 'react'
let URL = 'http://localhost:3000/api/v1/cocktails/'

class AddCocktail extends React.Component {
  constructor(){
    super();
    this.state = {
      name : "",
      description : "",
      instructions : "",
      proportions : [{amount: "", ingredient_name: ""}]
    }
  }
  // sets drink name state to value of name form input
  handleNameChange = e => {
    this.setState({name : e.currentTarget.value})
  }
  // sets drink description state to value of name form input
  handleDescriptionChange = e => {
    this.setState({description : e.currentTarget.value})
  }
  // sets drink ingredient amount state to value of name form input
  handleIngredientsAmountChange = e => {
    let proportionsArr = this.state.proportions.slice()
    let id = e.currentTarget.parentNode.id
    proportionsArr[id].amount = e.currentTarget.value
    this.setState({proportions : proportionsArr})
  }
  // sets drink ingredient name state to value of name form input
  handleIngredientsNameChange = e => {
    let proportionsArr = this.state.proportions.slice()
    let id = e.currentTarget.parentNode.id
    proportionsArr[id].ingredient_name = e.currentTarget.value
    this.setState({proportions : proportionsArr})
  }
  // sets drink instructions state to value of name form input
  handleInstructionsChange = e => {
    this.setState({instructions : e.currentTarget.value})
  }
  // activates when custom cocktail submit button is pressed
  addCocktail = event => {
    event.preventDefault()
    this.props.handleSubmit(this.state)
  }
  // adds another ingredient form with proportion and ingredient name to custom cocktail form
  addIngredientsForm = () => {
    let proportionsArr = this.state.proportions.slice()
    proportionsArr.push({amount: "", ingredient_name: ""})
    this.setState({proportions : proportionsArr})
  }
  // removes an ingredient form with proportion and ingredient name to custom cocktail form
  removeIngredientForm = e => {
    let id = parseInt(e.currentTarget.parentNode.id)
    let proportionsArr = this.state.proportions.slice()
    proportionsArr.splice(id, 1)
    this.setState({proportions : proportionsArr})
  }

  renderForm = () => {
    return <div className = "details-container">
      <form onSubmit={this.addCocktail}>
        <div className="name-input">
          <label>NAME: </label>
          <input onChange={this.handleNameChange}></input>
        </div>
        <label>DESCRIPTION: </label>
        <div className="large-input">
          <textarea onChange={this.handleDescriptionChange}></textarea>
        </div>
        <label>INGREDIENTS: </label>
        <div className="ingredients-form">
          {this.state.proportions.map(proportion =>
            <div key={this.state.proportions.indexOf(proportion)} id={this.state.proportions.indexOf(proportion)}>
              <input
                className="ingredients-amount"
                placeholder="amount"
                onChange={this.handleIngredientsAmountChange}
                value={this.state.proportions[this.state.proportions.indexOf(proportion)].amount}>
              </input>
              <input
                className="ingredients-name"
                placeholder="ingredient name"
                onChange={this.handleIngredientsNameChange}
                value={this.state.proportions[this.state.proportions.indexOf(proportion)].ingredient_name}>
              </input>
              <span className="removeIngredientButton" onClick={this.removeIngredientForm}>×</span>
            </div>
          )}
          <p className="addIngredientButton" onClick={this.addIngredientsForm}>+ add ingredient</p>
        </div>
        <label>INSTRUCTIONS: </label>
        <div className="large-input">
          <textarea onChange={this.handleInstructionsChange}></textarea>
        </div>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  }

  render(){
    return(
      <div>{this.renderForm()}</div>
    )
  }
}

export default AddCocktail

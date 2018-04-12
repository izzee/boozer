import React from 'react'

class AddCocktail extends React.Component {

  handleChange = e => {
    return console.log(e.currentTarget.value)
  }

  renderForm = () => {
    console.log('x')
    return <div id="add-cocktail-container">
      <form>
        <span>
          <label>NAME: </label>
          <input onChange={this.handleChange}></input>
        </span>
      </form>
    </div>
  }

  render(){
    return(
      <div id="details-container">{this.renderForm()}</div>
    )
  }
}

export default AddCocktail

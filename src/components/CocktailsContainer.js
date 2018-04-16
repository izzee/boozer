import React from 'react'
import CocktailDetails from './CocktailDetails'
import AddCocktail from './AddCocktail'
import SearchField from './SearchField'

let URL = 'http://localhost:3000/api/v1/cocktails/'

class CocktailsContainer extends React.Component {

  state = {
    cocktails : [],
    details : null,
    addCocktail : false,
    search : ""
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

  handleSubmit = cocktail => {
    console.log(cocktail)
    fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cocktail})
    })
      .then(res => res.json())
      .then(json => this.setState({
        cocktails: [...this.state.cocktails, json],
        addCocktail: false
      }))
  }
  handleSearch = search => {
    if(search){this.setState({search : search})}
  }

  renderCocktailNames = () => {
    if(this.state.search.length > 0){
      let filtered = this.state.cocktails.filter(cocktail => cocktail.name.toLowerCase().includes(this.state.search))
      if(filtered){
      return filtered.map(cocktail =>
        <li key={cocktail.id} id={cocktail.id}
          onClick={this.handleClick}
          style={{ fontWeight: (this.state.details && this.state.details.id === cocktail.id) ? 'bold' : null}}>
          {cocktail.name}
      </li>)}
    }
    return this.state.cocktails.map(cocktail =>
      <li key={cocktail.id} id={cocktail.id}
        onClick={this.handleClick}
        style={{ fontWeight: (this.state.details && this.state.details.id === cocktail.id) ? 'bold' : null}}>
        {cocktail.name}
    </li>)
  }

  renderDetails = () => {
    if(this.state.details){ return <CocktailDetails details={this.state.details} />}
  }

  addACocktail = () => {
    this.setState({search : ""})
    this.setState({details : null})
    this.setState({addCocktail : !this.state.addCocktail})
  }

  renderAddForm = () => {
    if(this.state.addCocktail){return <AddCocktail handleSubmit={this.handleSubmit}/>}
  }

  renderSearchField = () => {
    return <SearchField handleSearch={this.handleSearch}/>
  }

  render(){
    return(
      <div className="main-container">
        <div className="top-bar">
          <h1>Cocktails</h1>
          {<p style={{ fontWeight: this.state.addCocktail ? 'bold' : null}}>FILTER</p>}
          {<p style={{ fontWeight: this.state.addCocktail ? 'bold' : null}}>SORT</p>}
          {<p onClick={this.addACocktail} style={{ fontWeight: this.state.addCocktail ? 'bold' : null}}>CREATE A COCKTAIL</p>}
          {this.renderSearchField()}
        </div>
        <div className="list-container">
          <ul>{this.renderCocktailNames()}</ul>
        </div>
        {this.renderDetails()}
        {this.renderAddForm()}
      </div>
    )
  }
}

export default CocktailsContainer

import React from 'react'
import CocktailDetails from './CocktailDetails'
import AddCocktail from './AddCocktail'
import SearchField from './SearchField'

let URL = 'http://localhost:3000/api/v1/cocktails/'

class CocktailsContainer extends React.Component {

  state = {
    cocktails : [],
    details : "",
    addCocktail : false,
    search : "",
    filter : "",
    sortBy : "",
    favorites : []
  }

  componentDidMount = () => {
    fetch(URL)
      .then(res => res.json())
      .then(res => this.setState({cocktails : res}))
  }

  handleClick = e => {
    this.setState({addCocktail : false})
    this.fetchIngredients(e.currentTarget.id)
  }

  fetchIngredients = id => {
    fetch(URL + id)
      .then(res => res.json())
      .then(res => this.setState({details : res}))
  }

  handleSubmit = cocktail => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cocktail})
    })
      .then(res => res.json())
      .then(res => this.setState({
        cocktails: [...this.state.cocktails, res],
        addCocktail: false
      }))
  }
  handleSearch = search => {
    this.setState({search : search})
  }

  renderCocktailNames = () => {
      let filtered = this.filterCocktails()
      if(filtered){
      return filtered.map(cocktail =>
        <li key={cocktail.id} id={cocktail.id}
          onClick={this.handleClick}
          style={{ fontWeight: (this.state.details && this.state.details.id === cocktail.id) ? 'bold' : null}}>
          {cocktail.name}
      </li>)}
    }

  filterCocktails = () => {
    if(this.state.search){
      if(!this.filter === 'favorites'){
        return this.state.cocktails.filter(cocktail =>
          cocktail.name.toLowerCase().includes(this.state.search) ||
          cocktail.description.toLowerCase().includes(this.state.search) ||
          cocktail.instructions.toLowerCase().includes(this.state.search)
        )
      }else{
        return this.state.favorites.filter(cocktail =>
          cocktail.name.toLowerCase().includes(this.state.search) ||
          cocktail.description.toLowerCase().includes(this.state.search) ||
          cocktail.instructions.toLowerCase().includes(this.state.search)
        )
      }
    }else if (this.state.filter === 'user') {
      return this.state.cocktails.filter(cocktail => parseInt(cocktail.id) > 304)
    }else if (this.state.filter === 'favorites') {
      return this.state.favorites
    }else if (this.state.sortBy === 'name') {
      return this.state.cocktails.sort(
        function(a,b){
        if(a.name.toLowerCase() < b.name.toLowerCase()){return -1}
        else if(a.name.toLowerCase() > b.name.toLowerCase()){return 1}
        return 0
      })
    }else if (this.state.sortBy === 'year'){
      return this.state.cocktails.sort(function(a,b){
        if(a.source && b.source){
          if( a.source.slice(-4) < b.source.slice(-4)){return -1}
          else if ( a.source.slice(-4) > b.source.slice(-4)){return 1}
          else if ( a.id > b.id){ return -1}
          else if ( a.id < b.id){ return 1}
        }
      })
    }else if (this.state.sortBy === 'length'){
      return this.state.cocktails.sort(function(a,b){
        if(a.name.length < b.name.length){return -1}
        else if(a.name.length > b.name.length){return 1}
        else if ( a.id < b.id){ return -1}
        else if ( a.id > b.id){ return 1}
        return 0
      })
    }else{
      return this.state.cocktails.sort(function(a,b){
        if ( a.id < b.id){ return -1}
        else if ( a.id > b.id){ return 1}
        return 0
      })
    }
  }

  renderDetails = () => {
    if(this.state.details){ return <CocktailDetails details={this.state.details} addToFavorites={this.addToFavorites} favorites={this.state.favorites}/>
    }
  }
  clearState = () => {
    this.setState({
      details : "",
      search : "",
      filter : "",
      sortBy : "",
      addCocktail : false
    })
  }
  addACocktail = () => {
    this.clearState()
    this.setState({ addCocktail : !this.state.addCocktail })
  }
  filterUser = () => {
    this.clearState()
    this.setState({ filter : "user" })
  }
  filterFavorites = () => {
    this.clearState()
    this.setState({ filter: "favorites"})
  }
  sortName = () => {
    this.clearState()
    this.setState({ sortBy : "name" })
  }
  sortYear = () => {
    this.clearState()
    this.setState({ sortBy : "year" })
  }
  sortLength = () => {
    this.clearState()
    this.setState({ sortBy : "length" })
  }
  addToFavorites = cocktail => {
    if(this.state.favorites.find(favcocktail => favcocktail.id === cocktail.id)){
      let favoriteCocktails = [...this.state.favorites]
      let favIndex = favoriteCocktails.find(favcocktail => favcocktail.id === cocktail.id)
      favoriteCocktails.splice(favoriteCocktails.indexOf(favIndex))
      this.setState({
        favorites : favoriteCocktails,
        details: null
      })
    }else{
      let favoriteCocktails = [...this.state.favorites, cocktail]
      this.setState({favorites : favoriteCocktails})
    }
  }

  renderAddForm = () => {
    if(this.state.addCocktail){return <AddCocktail handleSubmit={this.handleSubmit}/>}
  }

  renderSearchField = () => {
    return <SearchField query={this.state.search} sort={this.state.sort} handleSearch={this.handleSearch}/>
  }

  render(){
    return(
      <div className="main-container">
        <div className="top-bar">
          <h1>Cocktails</h1>
          <div className="filter-options">
            <p>FILTER BY:</p>
            <ul className="dropdownlist">
              <li onClick={this.filterUser}>User</li>
              <li onClick={this.filterFavorites}>Favorites</li>
              <li onClick={this.clearState}>Show All</li>
            </ul>
          </div>
          <div className="filter-options">
            <p>SORT BY:</p>
            <ul className="dropdownlist">
              <li onClick={this.sortName}>Name</li>
              <li onClick={this.sortYear}>Year</li>
              <li onClick={this.sortLength}>Length</li>
              <li onClick={this.clearState}>Default</li>
            </ul>
          </div>
          {<p onClick={this.addACocktail} style={{ fontWeight: this.state.addCocktail ? 'bold' : null}}>CREATE A COCKTAIL</p>}
          {this.renderSearchField()}
        </div>
        <div className="list-container">
          <ul>{this.renderCocktailNames()}</ul>
        </div>
        {this.state.sortBy ? <p className="filterInfo">Sorted by: {this.state.sortBy}</p> : null}
        {this.state.filter ? <p className="filterInfo">Filtered by: {this.state.filter}</p> : null}
        {this.renderDetails()}
        {this.renderAddForm()}
      </div>
    )
  }
}

export default CocktailsContainer

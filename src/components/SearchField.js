import React from 'react'

export default class SearchField extends React.Component {

  handleChange = e => {
    this.props.handleSearch(e.currentTarget.value)
  }

  render(){
    return(
      <div>
        <form>
          <input placeholder="search..." onChange={this.handleChange}></input>
        </form>
      </div>
    )
  }
}

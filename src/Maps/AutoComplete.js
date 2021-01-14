import React, { Component } from 'react';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    const options = {
      // restrict your search to a specific type of result
      // types: ['geocode', 'address', 'establishment', '(regions)', '(cities)'],
      // restrict your search to a specific country, or an array of countries
      // componentRestrictions: { country: ['gb', 'us'] },
    };
    this.autoComplete = new mapApi.places.Autocomplete(
      this.searchInput,
      options,
    );
    this.autoComplete.addListener('place_changed', this.onPlaceChanged);
    this.autoComplete.bindTo('bounds', map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlaceChanged = ({ map, newPlace} = this.props) => {
    const place = this.autoComplete.getPlace();
    if (!place.geometry) return;

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(14);
    }
    
    newPlace(place);
    this.searchInput.blur();
  };

  clearSearchBox() {
    this.searchInput.value = '';
  }

  render() {
    return (
        <input
          ref={(ref) => {
            this.searchInput = ref;
          }}
          type="text"
          id={this.props.id}
          name={this.props.name}
          onFocus={this.clearSearchBox}
          placeholder={this.props.placeHolder}
        />
    );
  }
}

export default AutoComplete;
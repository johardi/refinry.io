var propertyCategories = [];
var db = new Dexie("clippingDB");
db.delete();
db.version(1).stores({
  items: 'url' // XXX: Rename to item
});
db.open();

var app = angular.module('schemaorg', ['ui.materialize', 'angular.filter', 'rzModule', 'user-profiles', 'schemaorg-markup'], function($provide) {
  // Fixes'history.pushState is not available in packaged apps' error message
  // Source: https://github.com/angular/angular.js/issues/11932
  $provide.decorator('$window', function($delegate) {
    Object.defineProperty($delegate, 'history', {
      get: function() {
        return null;
      }
    });
    return $delegate;
  });
});

app.filter('removeSeparator', function() {
  return function(input){
    var text = input.replace(/\s-\s/g, '|');
    var RegExp = /^([^|•:(+]+)/;
    var match = RegExp.exec(text);
    return match[1];
  };
});

app.factory('CustomSearch', function($q, $http) {
  var exec = function(apiKey, searchEngineId, keyword, page) {
    var defer = $q.defer();
    var offset = 10;
    var url = 'https://www.googleapis.com/customsearch/v1' +
      '?key=' + apiKey +
      '&cx=' + searchEngineId +
      '&q=' + keyword +
      '&start=' + (((page - 1) * offset) + 1) +
      '&num=10';
    $http.get(url).then(
      function(response) {
        defer.resolve(response.data.items);
      },
      function(err) {
        defer.reject(err);
      });
    return defer.promise;
  };
  return {
    exec: exec
  };
});

app.controller('SearchController', function($scope, profiles, schemaorgMarkup, CustomSearch) {
  var profile = profiles['schemaorg'];
  var sc = this;
  sc.facetModel = [];
  sc.searchResults = [];
  sc.categorialFacet = [];
  sc.numeralRangeFacet = [];

  $scope.doSearch = function() {
    var propertyCategories = [];

    var userInput = $scope.keyword;
    if (userInput == null) {
      return;
    }
    var input = processUserInput(userInput, schemaorgMarkup);
    var searchPromises = [];
    var pages = profile.pageLimit;
    var apiKey = profile.apiKey;
    var searchEngineId = profile.searchEngineId;
    var keyword = input.keyword;
    for (i = 1; i <= pages; i++) {
      var promise = CustomSearch.exec(apiKey, searchEngineId, keyword, i);
      searchPromises.push(promise);
    }
    Promise.all(searchPromises.map(settle)).then(results => {
      db.items.clear();
      results.filter(x => x.status === "resolved").forEach(output => {
        var topics = input.topics;
        var searchResults = output.value;
        storeResults(searchResults, topics, schemaorgMarkup)
      });

      db.items.toArray(data => { // XXX: Rename to items
        sc.searchResults = data;
        $scope.$apply();

        const searchFacet = {
          categorial: [],
          numeral: []
        }
        const categorialFacet = searchFacet.categorial;
        const numeralRangeFacet = searchFacet.numeral;
        for (var i = 0; i < data.length; i++) {
          var itemProperties = data[i].properties;
          for (var j = 0; j < itemProperties.length; j++) {
            var propertyItem = itemProperties[j]; // XXX: Rename to itemProperty
            if (propertyItem.range === "text") {
              // Construct the facet object
              var facetPosition = findIndex(categorialFacet, "id", propertyItem.id);
              if (facetPosition == -1) {
                categorialFacet.push({
                    id: propertyItem.id,
                    name: propertyItem.name,
                    label: propertyItem.label,
                    topic: propertyItem.domain.name,
                    type: "categorial",
                    visible: false,
                    choices: []
                  });
                facetPosition = categorialFacet.length - 1;
              }
              var choicePosition = findIndex(categorialFacet[facetPosition].choices, "value", propertyItem.value);
              if (choicePosition == -1) {
                categorialFacet[facetPosition].choices.push({
                    value: propertyItem.value,
                    selected: false
                  });
              }
            } else if (propertyItem.range === "numeric" || propertyItem.range === "duration") {
              // Construct the facet object
              var facetPosition = findIndex(numeralRangeFacet, "id", propertyItem.id);
              if (facetPosition == -1) {
                numeralRangeFacet.push({
                    id: propertyItem.id,
                    name: propertyItem.name,
                    label: propertyItem.label,
                    topic: propertyItem.domain.name,
                    type: "range",
                    visible: false,
                    unit: propertyItem.unit,
                    minValue: Number.MAX_SAFE_INTEGER,
                    maxValue: Number.MIN_SAFE_INTEGER,
                    options: {
                      id: propertyItem.id,
                      floor: Number.MAX_SAFE_INTEGER,
                      ceil: Number.MIN_SAFE_INTEGER,
                      step: 1,
                      hideLimitLabels: true,
                      onChange: $scope.onSliderChanged
                    }
                  });
                facetPosition = numeralRangeFacet.length - 1;
              }
              var value = propertyItem.value;
              if (value < numeralRangeFacet[facetPosition].minValue) {
                numeralRangeFacet[facetPosition].minValue = value;
                numeralRangeFacet[facetPosition].options.floor = value;
              }
              if (value > numeralRangeFacet[facetPosition].maxValue) {
                numeralRangeFacet[facetPosition].maxValue = value;
                numeralRangeFacet[facetPosition].options.ceil = value;
              }
            }
          }
        }

        // Construct the facet model
        var facetModel = [];
        var allFacets = [].concat.apply([], Object.values(searchFacet));
        for (var i = 0; i < allFacets.length; i++) {
          var facet = allFacets[i];
          var facetModelPosition = findIndex(facetModel, "id", facet.topic);
          if (facetModelPosition == -1) {
            facetModel.push({
                id: facet.topic,
                topic: {
                  name: schemaorgMarkup[facet.topic].name,
                  label: schemaorgMarkup[facet.topic].label
                },
                facets: []
              });
            facetModelPosition = facetModel.length - 1;
          }
          facetModel[facetModelPosition].facets.push(facet);
        }

        sc.facetModel = facetModel;
        sc.categorialFacet = categorialFacet;
        sc.numeralRangeFacet = numeralRangeFacet;
        $scope.$apply();
      });
    });
  }

  sc.filterModel = [];

  $scope.onOpen = function(facet) {
    facet.visible = true;
  }

  $scope.onClose = function(facet) {
    facet.visible = false;
    var filterPosition = findIndex(sc.filterModel, "id", facet.id);
    if (filterPosition != -1) {
      sc.filterModel.splice(filterPosition, 1);
    }
  }

  $scope.onCheckboxChanged = function(facet) {
    var filterPosition = findIndex(sc.filterModel, "id", facet.id);
    if (filterPosition == -1) {
      sc.filterModel.push({
        id: facet.id,
        name: facet.name,
        topic: facet.topic,
        type: facet.type,
        visible: facet.visible,
        values: []
      });
      filterPosition = sc.filterModel.length - 1;
    }
    for (var i = 0; i < facet.choices.length; i++) {
      var valuePosition = sc.filterModel[filterPosition].values.indexOf(facet.choices[i].value);
      if (facet.choices[i].selected && valuePosition == -1) {
        sc.filterModel[filterPosition].values.push(facet.choices[i].value);
      } else if (!facet.choices[i].selected && valuePosition != -1) {
        sc.filterModel[filterPosition].values.splice(valuePosition, 1);
      }
    }
  }

  $scope.onSliderChanged = function(id) {
    var resultArr = sc.numeralRangeFacet.filter(obj => { return obj.id == id });
    var facet = resultArr[0];
    var filterPosition = findIndex(sc.filterModel, "id", facet.id);
    if (filterPosition == -1) {
      sc.filterModel.push({
        id: facet.id,
        name: facet.name,
        type: facet.type,
        topic: facet.topic,
        visible: facet.visible,
        values: []
      });
      filterPosition = sc.filterModel.length - 1;
    }
    sc.filterModel[filterPosition].values[0] = facet.minValue;
    sc.filterModel[filterPosition].values[1] = facet.maxValue;
  }

  $scope.$watch('sc.filterModel', function(filterModel) {
    db.items.toArray(data => { // XXX: Rename to items
      var filterSize = filterModel.length;
      if (filterSize > 0) {
        data = data.filter(item => {
          var evalOnEachFilter = [];
          for (var i = 0; i < filterSize; i++) {
            var filter = filterModel[i];
            evalOnEachFilter[i] = (item.types.length == 0) || item.types.includes(filter.topic);
            for (var j = 0; j < item.properties.length; j++) {
              var property = item.properties[j];
              if (property.domain === filter.topic && property.name === filter.name) {
                if (filter.type === "categorial") {
                  evalOnEachFilter[i] = evalOnEachFilter[i] &&
                      filter.values.includes(property.value);
                } else if (filter.type === "range") {
                  evalOnEachFilter[i] = evalOnEachFilter[i] &&
                      property.value >= filter.values[0] &&
                      property.value <= filter.values[1];
                }
              }
            }
          }
          return evalOnEachFilter.reduce((a, b) => { return a && b; });
        });
      }
      sc.searchResults = data;
      $scope.$apply();
    });
  }, true);
});

function processUserInput(input, schemaorgMarkup) {
  var keyword_split = input.split('#');
  var keyword = keyword_split[0];
  var topics = keyword_split.filter(str => { return str != keyword });
  if (topics.length == 0) {
    topics = Object.keys(schemaorgMarkup);
  }
  return {
    keyword: keyword,
    topics: topics
  }
}

// Solution for handling request failure gracefully in Promise.all
// Source: https://stackoverflow.com/questions/31424561/wait-until-all-es6-promises-complete-even-rejected-promises
function settle(promise) {
  return promise.then(function(v){ return {value:v, status: "resolved" }},
                      function(e){ return {value:e, status: "rejected" }});
}

function storeResults(searchResults, topics, schemaorgMarkup) {
  if (searchResults != null) {
    searchResults.forEach(resultItem => {
      var pkItem = resultItem.link;
      storeBasicData(pkItem, resultItem);
      storeSchemaOrgData(pkItem, resultItem, topics, schemaorgMarkup);
    });
  }
}

function storeBasicData(pkItem, resultItem) {
  db.items.add({
    url: pkItem,
    title: resultItem.title,
    description: resultItem.snippet,
    types: [],
    properties: [],
    schemaorg: [],
  }).catch(err => {
    // console.error(err);
  });
}

function storeSchemaOrgData(pkItem, resultItem, topics, schemaorgMarkup) {
  for (var i = 0; i < topics.length; i++) {
    var topic = topics[i];
    var schemaOrgData = getSchemaOrgData(resultItem, topic);
    if (schemaOrgData != null) {
      updateTableWithSchemaOrgData(pkItem, schemaOrgData);
      updateTableWithSchemaOrgTypes(pkItem, schemaOrgData);
      updateTableWithSchemaOrgProperties(pkItem, schemaOrgData, schemaorgMarkup[topic]);
    }
  }
}

function updateTableWithSchemaOrgData(pkItem, schemaOrgData) {
  db.items.where('url').equals(pkItem).modify(item => {
    item.schemaorg.push(schemaOrgData)
  }).catch(err => {
    // console.error(err);
  });
}

function updateTableWithSchemaOrgTypes(pkItem, schemaOrgData) {
  db.items.where('url').equals(pkItem).modify(item => {
    var types = Object.keys(schemaOrgData);
    for (var i = 0; i < types.length; i++) {
      item.types.push(types[i]);
    }
  }).catch(err => {
    // console.error(err);
  });
}

function updateTableWithSchemaOrgProperties(pkItem, schemaOrgData, selectedTopic) {
  db.items.where('url').equals(pkItem).modify(item => {
    var topicName = selectedTopic.name;
    var topicLabel = selectedTopic.label;
    for (var i = 0; i < selectedTopic.properties.length; i++) {
      var propertyObject = selectedTopic.properties[i];
      var propertyName = propertyObject.name;
      var propertyLabel = propertyObject.label;
      var propertyType = propertyObject.type;
      var propertyUnit = propertyObject.unit;
      var propertyValue = schemaOrgData[topicName][propertyName];
      if (propertyValue != null) {
        var property = {
          id: getPropertyId(topicName, propertyName),
          domain: {
            name: topicName,
            label: topicLabel
          },
          range: propertyType,
          name: propertyName,
          label: propertyLabel,
          value: refineValue(propertyValue, propertyType, propertyUnit)
        }
        if (propertyUnit != null) {
          property.unit = propertyUnit;
        }
        item.properties.push(property);
      }
    }
  }).catch(err => {
    console.error(err);
  });
}

function getPropertyId(topicName, propertyName) {
  const propertyCategoryName = topicName + propertyName;
  var propertyId = propertyCategories.indexOf(propertyCategoryName);
  if (propertyId == -1) {
    propertyCategories.push(propertyCategoryName);
    propertyId = propertyCategories.length - 1;
  }
  return propertyId;
}

function getSchemaOrgData(obj, topic) {
  if (!obj.hasOwnProperty('pagemap')) {
    return;
  }
  var pagemap = obj.pagemap;
  if (!pagemap.hasOwnProperty(topic)) {
    return;
  }
  var topicArray = pagemap[topic];
  var topicAttributes = findBestData(topicArray);
  var topicObject = {};
  topicObject[topic] = topicAttributes;
  return topicObject;
}

function findBestData(arr) {
  var toReturn = {};
  var bestInfoSize = -1;
  for (var i = 0; i < arr.length; i++) {
    var topicObject = arr[i];
    var infoSize = Object.keys(topicObject).length;
    if (infoSize > bestInfoSize) {
      toReturn = topicObject;
      bestInfoSize = infoSize;
    }
  }
  return toReturn;
}

function refineValue(value, dtype, unit) {
  if (dtype === "numeric") {
    return refineNumericData(value, unit);
  } else if (dtype === "duration") {
    return refineDurationData(value, unit);
  }
  return value;
}

function refineNumericData(value, unit) {
  if (unit != null) {
    try {
      return Qty(value).to(unit).scalar;
    } catch (err) {
      return autoFixNumericData(value);
    }
  } else {
    return autoFixNumericData(value);
  }
}

function refineDurationData(value, unit) {
  var duration = moment.duration(value);
  if (duration._milliseconds != 0) {
    return duration.as(unit);
  } else {
    return autoFixDurationData(value);
  }
}

function autoFixNumericData(value) {
  var numericValue = getNumberOnly(value)
  console.log("INFO: Applying an auto-fix for [numeric] data by converting " +
      "\"" + value + "\" to \"" + numericValue + "\"");
  return numericValue;
}

function autoFixDurationData(value) {
  var durationValue = getNumberOnly(value);
  console.log("INFO: Applying an auto-fix for [duration] data by converting " +
      "\"" + value + "\" to \"" + durationValue + "\"");
  return durationValue;
}

function getNumberOnly(text) {
  var RegExp = /(\d+([\/\.]\d+)?)/;
  var match = RegExp.exec(text);
  return evalNumber(match[1]);
}

function evalNumber(number) {
  var value = number;
  var y = number.split(' ');
  if (y.length > 1) {
    var z = y[1].split('/');
    value = +y[0] + (z[0] / z[1]);
  } else {
    var z = y[0].split('/');
    if (z.length > 1) {
      value = z[0] / z[1];
    }
  }
  return +value;
}

function findIndex(arr, key, value) {
  for(var i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) return i;
  }
  return -1;
}

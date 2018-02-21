'use strict';

angular.module('search')

.constant('SchemaOrgVocab',
  { 'recipe': {
      'id': 'recipe',
      'name': 'schema:Recipe',
      'label': 'Food Recipe',
      'canonicalUrl': 'http://schema.org/Recipe',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'preptime',
          'name': 'schema:prepTime',
          'label': 'Prep Time',
          'type': 'duration',
          'unit': 'minute',
          'canonicalUrl': 'http://schema.org/prepTime',
          'filterable': true
        },
        { 'id': 'cooktime',
          'name': 'schema:cookTime',
          'label': 'Cook Time',
          'type': 'duration',
          'unit': 'minute',
          'canonicalUrl': 'http://schema.org/cookTime',
          'filterable': true
        },
        { 'id': 'totaltime',
          'name': 'schema:totalTime',
          'label': 'Total Time',
          'type': 'duration',
          'unit': 'minute',
          'canonicalUrl': 'http://schema.org/totalTime',
          'filterable': true
        },
        { 'id': 'recipeyield',
          'name': 'schema:recipeYield',
          'label': 'Serving Size',
          'type': 'numeric',
          'canonicalUrl': 'http://schema.org/recipeYield',
          'filterable': true
        },
        { 'id': 'recipecategory',
          'name': 'schema:recipeCategory',
          'label': 'Recipe Category',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/recipeCategory',
          'filterable': true
        },
        { 'id': 'aggregaterating',
          'name': 'schema:aggregateRating',
          'label': 'Recipe Rating',
          'type': 'numeric',
          'canonicalUrl': 'http://schema.org/aggregateRating',
          'filterable': true
        },
        { 'id': 'recipeinstructions',
          'name': 'schema:recipeInstructions',
          'label': 'Directions',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/recipeInstructions',
          'filterable': false
        },
        { 'id': 'ingredients',
          'name': 'schema:ingredients',
          'label': 'Ingredients',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/ingredients',
          'filterable': false
        },
        { 'id': 'author',
          'name': 'schema:author',
          'label': 'Recipe by',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/auhor',
          'filterable': false
        },
        { 'id': 'image',
          'name': 'schema:image',
          'label': 'Food Image',
          'type': 'url+image',
          'canonicalUrl': 'http://schema.org/image',
          'filterable': false
        },
        { 'id': 'recipecuisine',
          'name': 'schema:recipeCuisine',
          'label': 'Type of Cuisine',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/recipeCuisine',
          'filterable': true
        }
      ]
    },
    'nutritioninformation': {
      'id': 'nutritioninformation',
      'name': 'schema:NutritionInformation',
      'label': 'Nutrition Info',
      'canonicalUrl': 'http://schema.org/NutritionInformation',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'calories',
          'name': 'schema:calories',
          'label': 'Calories',
          'type': 'numeric',
          'unit': 'kcal',
          'canonicalUrl': 'http://schema.org/calories',
          'filterable': true
        },
        { 'id': 'fatcontent',
          'name': 'schema:fatContent',
          'label': 'Fat',
          'type': 'numeric',
          'unit': 'g',
          'canonicalUrl': 'http://schema.org/fatContent',
          'filterable': true
        },
        { 'id': 'carbohydratecontent',
          'name': 'schema:carbohydrateContent',
          'label': 'Carbohydrate',
          'type': 'numeric',
          'unit': 'g',
          'canonicalUrl': 'http://schema.org/carbohydrateContent',
          'filterable': true
        },
        { 'id': 'proteincontent',
          'name': 'schema:proteinContent',
          'label': 'Protein',
          'type': 'numeric',
          'unit': 'g',
          'canonicalUrl': 'http://schema.org/proteinContent',
          'filterable': true
        },
        { 'id': 'cholesterolcontent',
          'name': 'schema:cholesterolContent',
          'label': 'Cholesterol',
          'type': 'numeric',
          'unit': 'mg',
          'canonicalUrl': 'http://schema.org/cholesterolContent',
          'filterable': true
        },
        { 'id': 'sodiumcontent',
          'name': 'schema:sodiumContent',
          'label': 'Sodium',
          'type': 'numeric',
          'unit': 'mg',
          'canonicalUrl': 'http://schema.org/sodiumContent',
          'filterable': true
        },
        { 'id': 'fibercontent',
          'name': 'schema:fiberContent',
          'label': 'Fiber',
          'type': 'numeric',
          'unit': 'g',
          'canonicalUrl': 'http://schema.org/fiberContent',
          'filterable': true
        },
        { 'id': 'saturatedfatcontent',
          'name': 'schema:saturatedFatContent',
          'label': 'Saturated Fat',
          'type': 'numeric',
          'unit': 'g',
          'canonicalUrl': 'http://schema.org/saturatedFatContent',
          'filterable': true
        },
        { 'id': 'unsaturatedfatcontent',
          'name': 'schema:unsaturatedFatContent',
          'label': 'Unsaturated Fat',
          'type': 'numeric',
          'unit': 'g',
          'canonicalUrl': 'http://schema.org/unsaturatedFatContent',
          'filterable': true
        },
        { 'id': 'transfatcontent',
          'name': 'schema:transFatContent',
          'label': 'Trans Fat',
          'type': 'numeric',
          'unit': 'g',
          'canonicalUrl': 'http://schema.org/transFatContent',
          'filterable': true
        },
        { 'id': 'sugarcontent',
          'name': 'schema:sugarContent',
          'label': 'Sugar',
          'type': 'numeric',
          'unit': 'g',
          'canonicalUrl': 'http://schema.org/sugarContent',
          'filterable': true
        }
      ]
    },
    'newsarticle': {
      'id': 'newsarticle',
      'name': 'schema:NewsArticle',
      'label': 'News Article',
      'canonicalUrl': 'http://schema.org/NewsArticle',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'image',
          'name': 'schema:image',
          'label': 'Article Image',
          'type': 'url+image',
          'canonicalUrl': 'http://schema.org/image',
          'filterable': false
        },
        { 'id': 'headline',
          'name': 'schema:headline',
          'label': 'Article Headline',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/headline',
          'filterable': false
        },
        { 'id': 'author',
          'name': 'schema:author',
          'label': 'Article by',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/author',
          'filterable': false
        },
        { 'id': 'genre',
          'name': 'schema:genre',
          'label': 'Article Genre',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/genre',
          'filterable': true
        },
        { 'id': 'articlesection',
          'name': 'schema:articleSection',
          'label': 'Article Section',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/articleSection',
          'filterable': true
        },
        { 'id': 'datepublished',
          'name': 'schema:datePublished',
          'label': 'Publication Date',
          'type': 'date',
          'canonicalUrl': 'http://schema.org/datePublished',
          'filterable': true
        },
        { 'id': 'printedition',
          'name': 'schema:printEdition',
          'label': 'Printed by',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/printedEdition',
          'filterable': false
        },
        { 'id': 'copyrightyear',
          'name': 'schema:copyrightYear',
          'label': 'Published Year',
          'type': 'date',
          'canonicalUrl': 'http://schema.org/copyrightYear',
          'filterable': false
        }
      ]
    },
    'book': {
      'id': 'book',
      'name': 'schema:Book',
      'label': 'Book',
      'canonicalUrl': 'http://schema.org/Book',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'bookformat',
          'name': 'schema:bookFormat',
          'label': 'Book Format',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/bookFormat',
          'filterable': true
        },
        { 'id': 'numberofpages',
          'name': 'schema:numberOfPages',
          'label': 'Number of Pages',
          'type': 'numeric',
          'canonicalUrl': 'http://schema.org/numberOfPages',
          'filterable': true
        },
        { 'id': 'inlanguage',
          'name': 'schema:inLanguage',
          'label': 'Language',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/inLanguage',
          'filterable': true
        }
      ]
    },
    'movie': {
      'id': 'movie',
      'name': 'schema:Movie',
      'label': 'Movie',
      'canonicalUrl': 'http://schema.org/Movie',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'contentrating',
          'name': 'schema:contentRating',
          'label': 'Movie Rating',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/contentRating',
          'filterable': true
        },
        { 'id': 'duration',
          'name': 'schema:duration',
          'label': 'Movie Duration',
          'type': 'duration',
          'unit': 'minute',
          'canonicalUrl': 'http://schema.org/duration',
          'filterable': true
        },
        { 'id': 'genre',
          'name': 'schema:genre',
          'label': 'Movie Genre',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/genre',
          'filterable': true
        },
        { 'id': 'datepublished',
          'name': 'schema:datePublished',
          'label': 'Release Date',
          'type': 'date',
          'canonicalUrl': 'http://schema.org/datePublished',
          'filterable': false
        },
        { 'id': 'trailer',
          'name': 'schema:trailer',
          'label': 'Movie Trailer',
          'type': 'url+video',
          'canonicalUrl': 'http://schema.org/trailer',
          'filterable': false
        }
      ]
    },
    'videoobject': {
      'id': 'videoobject',
      'name': 'schema:VideoObject',
      'label': 'Video',
      'canonicalUrl': 'http://schema.org/VideoObject',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'datepublished',
          'name': 'schema:datePublished',
          'label': 'Publication Date',
          'type': 'date',
          'canonicalUrl': 'http://schema.org/datePublished',
          'filterable': true
        },
        { 'id': 'duration',
          'name': 'schema:duration',
          'label': 'Duration',
          'type': 'duration',
          'unit': 'minute',
          'canonicalUrl': 'http://schema.org/duration',
          'filterable': true
        },
        { 'id': 'isfamilyfriendly',
          'name': 'schema:isFamilyFriendly',
          'label': 'Family Friendly?',
          'type': 'boolean',
          'canonicalUrl': 'http://schema.org/isFamilyFriendly',
          'filterable': true
        },
        { 'id': 'genre',
          'name': 'schema:genre',
          'label': 'Video Genre',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/genre',
          'filterable': true
        },
        { 'id': 'embedurl',
          'name': 'schema:embedUrl',
          'label': 'Video URL',
          'type': 'url+video',
          'canonicalUrl': 'http://schema.org/embedUrl',
          'filterable': false
        },
        { 'id': 'interactioncount',
          'name': 'schema:interactionCount',
          'label': 'Total Viewer',
          'type': 'numeric',
          'canonicalUrl': 'http://schema.org/interactionCount',
          'filterable': false
        },
        { 'id': 'interactionstatistic',
          'name': 'schema:interactionStatistic',
          'label': 'Total Viewer',
          'type': 'numeric',
          'canonicalUrl': 'http://schema.org/interactionStatistic',
          'filterable': false
        },
        { 'id': 'uploaddate',
          'name': 'schema:uploadDate',
          'label': 'Upload Date',
          'type': 'date',
          'canonicalUrl': 'http://schema.org/uploadDate',
          'filterable': false
        }
      ]
    },
    'dataset': {
      'id': 'dataset',
      'name': 'schema:Dataset',
      'label': 'Dataset',
      'canonicalUrl': 'http://schema.org/Dataset',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'license',
          'name': 'schema:license',
          'label': 'License',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/license',
          'filterable': true
        }
      ]
    },
    'organization': {
      'id': 'organization',
      'name': 'schema:Organization',
      'label': 'Organization',
      'canonicalUrl': 'http://schema.org/Organization',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        }
      ]
    },
    'administrativearea': {
      'id': 'administrativearea',
      'name': 'schema:AdministrativeArea',
      'label': 'Location Info',
      'canonicalUrl': 'http://schema.org/AdministrativeArea',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'additionaltype',
          'name': 'schema:additionalType',
          'label': 'Type of Location',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/additionalType',
          'filterable': true
        }
      ]
    },
    'postaladdress': {
      'id': 'postaladdress',
      'name': 'schema:PostalAddress',
      'label': 'Detailed Address',
      'canonicalUrl': 'http://schema.org/Organization',
      'properties': [
        { 'id': 'addresscountry',
          'name': 'schema:addressCountry',
          'label': 'Country',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/addressCountry',
          'filterable': true
        },
        { 'id': 'addresslocality',
          'name': 'schema:addressLocality',
          'label': 'City',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/addressLocality',
          'filterable': true
        },
        { 'id': 'addressregion',
          'name': 'schema:addressRegion',
          'label': 'Region',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/addressRegion',
          'filterable': true
        },
        { 'id': 'postalcode',
          'name': 'schema:postalCode',
          'label': 'Postal Code',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/postalCode',
          'filterable': true
        }
      ]
    },
    'webpage': {
      'id': 'webpage',
      'name': 'schema:WebPage',
      'label': 'Web Page',
      'canonicalUrl': 'http://schema.org/WebPage',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'headline',
          'name': 'schema:headline',
          'label': 'Article Headline',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/headline',
          'filterable': false
        },
        { 'id': 'author',
          'name': 'schema:author',
          'label': 'Article by',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/author',
          'filterable': false
        },
        { 'id': 'citation',
          'name': 'schema:citation',
          'label': 'Citation',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/citation',
          'filterable': false
        },
        { 'id': 'datepublished',
          'name': 'schema:datePublished',
          'label': 'Publication Date',
          'type': 'date',
          'canonicalUrl': 'http://schema.org/datePublished',
          'filterable': true
        },
        { 'id': 'url',
          'name': 'schema:url',
          'label': 'URL',
          'type': 'url',
          'canonicalUrl': 'http://schema.org/url',
          'filterable': true
        },
        { 'id': 'sameas',
          'name': 'schema:sameAs',
          'label': 'Source',
          'type': 'url',
          'canonicalUrl': 'http://schema.org/sameAs',
          'filterable': false
        }
      ]
    },
    'medicalwebpage': {
      'id': 'medicalwebpage',
      'name': 'schema:MedicalWebPage',
      'label': 'Medical Web Page',
      'canonicalUrl': 'http://schema.org/MedicalWebPage',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'headline',
          'name': 'schema:headline',
          'label': 'Article Headline',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/headline',
          'filterable': false
        },
        { 'id': 'author',
          'name': 'schema:author',
          'label': 'Article by',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/author',
          'filterable': false
        },
        { 'id': 'citation',
          'name': 'schema:citation',
          'label': 'Citation',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/citation',
          'filterable': false
        },
        { 'id': 'datepublished',
          'name': 'schema:datePublished',
          'label': 'Publication Date',
          'type': 'date',
          'canonicalUrl': 'http://schema.org/datePublished',
          'filterable': true
        },
        { 'id': 'url',
          'name': 'schema:url',
          'label': 'URL',
          'type': 'url',
          'canonicalUrl': 'http://schema.org/url',
          'filterable': true
        },
        { 'id': 'sameas',
          'name': 'schema:sameAs',
          'label': 'Source',
          'type': 'url',
          'canonicalUrl': 'http://schema.org/sameAs',
          'filterable': false
        }
      ]
    },
    'medicalstudy': {
      'id': 'medicalstudy',
      'name': 'schema:MedicalStudy',
      'label': 'Medical Study',
      'canonicalUrl': 'http://schema.org/MedicalStudy',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'population',
          'name': 'schema:population',
          'label': 'Population',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/population',
          'filterable': false
        },
        { 'id': 'sameas',
          'name': 'schema:sameAs',
          'label': 'Source',
          'type': 'url',
          'canonicalUrl': 'http://schema.org/sameAs',
          'filterable': false
        }
      ]
    },
    'medicaltrial': {
      'id': 'medicaltrial',
      'name': 'schema:MedicalTrial',
      'label': 'Clinical Trial',
      'canonicalUrl': 'http://schema.org/MedicalTrial',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'alternateName',
          'name': 'schema:alternateName',
          'label': 'Alternative Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'population',
          'name': 'schema:population',
          'label': 'Population',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/population',
          'filterable': false
        },
        { 'id': 'studylocation',
          'name': 'schema:studyLocation',
          'label': 'Study Location',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/studyLocation',
          'filterable': false
        },
        { 'id': 'phase',
          'name': 'schema:phase',
          'label': 'Phase',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/phase',
          'filterable': true
        },
        { 'id': 'status',
          'name': 'schema:status',
          'label': 'Status',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/status',
          'filterable': true
        },
        { 'id': 'studysubject',
          'name': 'schema:studySubject',
          'label': 'Study Subject',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/studySubject',
          'filterable': true
        },
        { 'id': 'sameas',
          'name': 'schema:sameAs',
          'label': 'Source',
          'type': 'url',
          'canonicalUrl': 'http://schema.org/sameAs',
          'filterable': false
        }
      ]
    },
    'drug': {
      'id': 'drug',
      'name': 'schema:Drug',
      'label': 'Drug',
      'canonicalUrl': 'http://schema.org/Drug',
      'properties': [
        { 'id': 'name',
          'name': 'schema:name',
          'label': 'Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/name',
          'filterable': false
        },
        { 'id': 'description',
          'name': 'schema:description',
          'label': 'Description',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/description',
          'filterable': false
        },
        { 'id': 'activeingredient',
          'name': 'schema:activeIngredient',
          'label': 'Active Ingredient',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/activeIngredient',
          'filterable': false
        },
        { 'id': 'administrationroute',
          'name': 'schema:administrationRoute',
          'label': 'Administration Route',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/administrationRoute',
          'filterable': false
        },
        { 'id': 'availablestrength',
          'name': 'schema:availableStrength',
          'label': 'Available Strength',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/availableStrength',
          'filterable': false
        },
        { 'id': 'cost',
          'name': 'schema:cost',
          'label': 'Drug Price',
          'type': 'numeric',
          'canonicalUrl': 'http://schema.org/cost',
          'filterable': true
        },
        { 'id': 'dosageform',
          'name': 'schema:dosageForm',
          'label': 'Dosage Form',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/dosageForm',
          'filterable': true
        },
        { 'id': 'dosageschedule',
          'name': 'schema:dosageSchedule',
          'label': 'Dosage Schedule',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/dosageSchedule',
          'filterable': false
        },
        { 'id': 'dosageunit',
          'name': 'schema:dosageUnit',
          'label': 'Dosage Unit',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/dosageUnit',
          'filterable': false
        },
        { 'id': 'foodwarning',
          'name': 'schema:foodWarning',
          'label': 'Food Warning',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/foodWarning',
          'filterable': false
        },
        { 'id': 'interactingdrug',
          'name': 'schema:interactingDrug',
          'label': 'Interacting Drug',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/interactingDrug',
          'filterable': false
        },
        { 'id': 'legalstatus',
          'name': 'schema:legalStatus',
          'label': 'Legal Status',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/legalStatus',
          'filterable': false
        },
        { 'id': 'manufacturer',
          'name': 'schema:manufacturer',
          'label': 'Manufacturer',
          'type': 'enum',
          'canonicalUrl': 'http://schema.org/manufacturer',
          'filterable': true
        },
        { 'id': 'mechanismofaction',
          'name': 'schema:mechanismOfAction',
          'label': 'Mechanism of Action',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/mechanismOfAction',
          'filterable': false
        },
        { 'id': 'nonproprietaryname',
          'name': 'schema:nonProprietaryName',
          'label': 'Generic Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/nonProprietaryName',
          'filterable': false
        },
        { 'id': 'proprietaryname',
          'name': 'schema:proprietaryName',
          'label': 'Brand Name',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/activeIngredient',
          'filterable': false
        },
        { 'id': 'alternatename',
          'name': 'schema:alternateName',
          'label': 'Synonym',
          'type': 'text',
          'canonicalUrl': 'http://schema.org/alternateName',
          'filterable': false
        }
      ]
    }
  });

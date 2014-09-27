# PLANS

This document is meant to outline what we can do with this repository.
Currently, this list of conferences is one of the awesome-* repositories, which
are a number of repostories where information is stored solely in a README.md.
However, this may not be the best way to display conferences, as each item will
have multiple fields that are worth accounting for.

Here, we outline what data we would like to collect, and how we would like to
ultimately view it, outside and inside of the README.md file.

### Desired Fields

```
var Conferences = {
 'dates': {
    'startDate': Date
    'endDate': Date
    'duration': Int // Days
  },
  'recurring': ['Weekly', 'Monthly', 'Quarterly', 'Biannually', 'Annually', 'Semiannually'], // May be a better way of doing this.
  'location': {
    'city': String,
    'state': String // province
    'region': String,
    'country': String,
    'continent': String
  },
  'field': String,
  'keywords': Array<String> // Also subfields,
  'computerLanguages': Array<String>
  'humanLanguages': Array<String> // English, ['German', 'English']
  'coc': {
    'exists': Bool,
    'type': String,
    'link': URL
  },
  'submissions': { 
    'type': ['Open', 'Closed', 'Peer Reviewed'],
    'dates': {
      'endDate': Date // Should think about when this might happen. First call, second, etc.
    }
  },
  'twitter': {
    'handle': @String,
    'link': URL,
  },
  'website': URL,
  'organisers': Array<String>,
  'costs': Obj // For tiers
}
```
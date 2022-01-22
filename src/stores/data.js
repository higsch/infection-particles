import { readable, derived } from 'svelte/store';
import { csv, autoType, groups } from 'd3';

import { uniqueDate } from '../utils/array';

const dataPath = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv';
const excludeLocations = [
  'International',
  'North America',
  'South America',
  'Europe',
  'Africa',
  'Oceania',
  'Asia',
  'World',
  'High income',
  'Upper middle income',
  'Lower middle income',
  'Low income'
];
export const data = readable([], async set => {
  const data = await csv(dataPath, autoType);
  const filteredData = data.filter(d => !excludeLocations.includes(d.location));
  set(filteredData);
});

export const locations = derived(data, $data => {
  return [...new Set($data.map(d => d.location))].sort();
});

export const locationData = derived(data, $data => {
  const reducedData = $data.map(d => {
    const incidence = +d.new_cases_smoothed_per_million;
    const deaths = +d.new_deaths_smoothed_per_million * 10;
    const icu = +d.icu_patients_per_million;
    const { date, location } = d;
    return {
      location,
      date,
      incidence,
      deaths,
      icu
    };
  });

  const locationData = groups(reducedData, d => d.location).map(([ location, data ]) => {
    return {
      location,
      data
    };
  });

  return locationData;
});

export const dates = derived(data, $data => {
  return uniqueDate($data.map(d => d.date)).map((date, i) => {
    return {
      id: i,
      date
    };
  });
});
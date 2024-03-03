import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Temperature Data Schema
const TemperatureDataSchema = Type.Array(
  Type.Object({
    month: Type.String(),
    temp: Type.Optional(Type.Number())
  })
)

// Weights Schema
const WeightsSchema = Type.Object({
  costOfLivingWeight: Type.Optional(Type.Number()),
  recreationalActivitiesWeight: Type.Optional(Type.Number()),
  weatherWeight: Type.Optional(Type.Number()),
  jobOpportunityWeight: Type.Optional(Type.Number()),
  publicServicesWeight: Type.Optional(Type.Number()),
  crimeRateWeight: Type.Optional(Type.Number()),
  sceneryWeight: Type.Optional(Type.Number()),
  airQualityWeight: Type.Optional(Type.Number()),
  totalAvailablePoints: Type.Optional(Type.Number())
})

// Job Schema
const JobSchema = Type.Object({
  naics: Type.String(),
  occ: Type.String()
})

const RecreationalInterestKey = Type.Union([
  Type.Literal('mountains'),
  Type.Literal('nationalParks'),
  Type.Literal('forests'),
  Type.Literal('waterfrontViews'),
  Type.Literal('scenicDrives'),
  Type.Literal('historicSites'),
  Type.Literal('monuments'),
  Type.Literal('museums'),
  Type.Literal('naturalWonders'),
  Type.Literal('rockClimbing'),
  Type.Literal('waterSports'),
  Type.Literal('beach'),
  Type.Literal('diverseFloraFauna'),
  Type.Literal('birdWatching'),
  Type.Literal('zoos'),
  Type.Literal('winterSports'),
  Type.Literal('stargazing'),
  Type.Literal('amusementParks')
])

// Define RecreationalInterestMappings as a record type
const RecreationalInterestMappingsSchema = Type.Record(RecreationalInterestKey, Type.Array(Type.String()))

// Example values for RecreationalInterestMappings
export const RecreationalInterestMappings = {
  mountains: ['Mountain Peak', 'Mountain', 'Hiking Trail', 'Hiking Spot'],
  nationalParks: [
    'National Park',
    'State Park',
    'Park',
    'National Park for the Performing Arts',
    'National Preserve',
    'Scenic Area',
    'National Grassland',
    'National Reserve',
    'Wilderness Area',
    'National Recreation Area'
  ],
  forests: ['National Forest', 'Rainforest'],
  waterfrontViews: [
    'National Seashore',
    'Beach',
    'National Lakeshore',
    'Lake',
    'Great Lake',
    'Lakes',
    'Reservoir',
    'Bay',
    'Inlet',
    'River',
    'Fjord',
    'Lake System',
    'Lake Region',
    'National River'
  ],
  scenicDrives: ['Scenic Drive', 'Parkway'],
  historicSites: [
    'Historic Site',
    'Historical Park',
    'Historical Site',
    'Ranch',
    'Historic Landmark',
    'Historic Trail',
    'Landmark',
    'Center',
    'Battlefields Memorial',
    'Heritage Area',
    'Memorial Park',
    'Heritage Corridor',
    'National Military Park',
    'National Battlefield',
    'National Historical Park'
  ],
  monuments: ['National Monument', 'National Memorial', 'Mountain Memorial', 'Memorial', 'Monument'],
  museums: ['Museum', 'National Museum'],
  naturalWonders: [
    'Natural Arch',
    'Waterfall',
    'Viewpoint',
    'Granite Dome',
    'Slot Canyon',
    'Valley',
    'Estuary',
    'Cave'
  ],
  rockClimbing: ['Climbing Area'],
  waterSports: [
    'National Riverway',
    'National Scenic River',
    'Scenic River',
    'National Lakeshore',
    'Lake',
    'Great Lake',
    'Lakes',
    'Bay',
    'Lake System',
    'Lake Region',
    'National River'
  ],
  beach: ['Beach'],
  diverseFloraFauna: ['Botanical Garden'],
  birdWatching: [],
  zoos: ['Zoo', 'Wildlife Reserve'],
  winterSports: ['Ski Resort'],
  stargazing: ['Observatory'],
  amusementParks: ['Amusement Park']
}

export type RecreationalInterestKeys = Static<typeof RecreationalInterestKey>
export type RecreationalInterestMappingsSchema = typeof RecreationalInterestMappings

// SurveyFormData Schema
export const SurveyFormDataSchema = Type.Object({
  snowPreference: Type.Optional(
    Type.Union([Type.Literal('none'), Type.Literal('light'), Type.Literal('heavy')])
  ),
  rainPreference: Type.Optional(Type.Union([Type.Literal('dry'), Type.Literal('regular')])),
  minSalary1: Type.Optional(Type.Number()),
  minSalary2: Type.Optional(Type.Number()),
  minPopulation: Type.Optional(Type.Number()),
  maxPopulation: Type.Optional(Type.Number()),
  includedStates: Type.Optional(Type.Array(Type.Number())),
  jobLevel: Type.Optional(
    Type.Union([Type.Literal('entry-level'), Type.Literal('senior'), Type.Literal('both')])
  ),
  selectedJobs: Type.Optional(Type.Array(JobSchema)),
  livingPreference: Type.Optional(
    Type.Union([Type.Literal('city'), Type.Literal('suburb'), Type.Literal('rural')])
  ),
  recreationalInterests: Type.Optional(Type.Array(Type.String())),
  publicServices: Type.Optional(Type.Array(Type.String())),
  scenery: Type.Optional(Type.String()),
  searchRadius: Type.Optional(Type.Number()),
  housingType: Type.Optional(Type.Union([Type.Literal('rent'), Type.Literal('buy')])),
  homeMin: Type.Optional(Type.Number()),
  homeMax: Type.Optional(Type.Number()),
  rentMin: Type.Optional(Type.Number()),
  rentMax: Type.Optional(Type.Number()),
  humidityPreference: Type.Optional(Type.Number()),
  temperatureData: TemperatureDataSchema,
  weights: WeightsSchema
})

// Schema for creating new entries
export const surveyDataSchema = Type.Object({
  data: SurveyFormDataSchema,
  user_id: Type.Number()
})
export type Weights = Static<typeof WeightsSchema>
export type WeightKeys = keyof Static<typeof WeightsSchema>
export type SurveyData = Static<typeof surveyDataSchema>
export const surveyDataValidator = getValidator(surveyDataSchema, dataValidator)
export const surveyDataResolver = resolve<SurveyData, HookContext>({})

// Schema for updating existing entries
export const surveyPatchSchema = Type.Partial(surveyDataSchema, {
  $id: 'SurveyPatch'
})
export type SurveyPatch = Static<typeof surveyPatchSchema>
export const surveyPatchValidator = getValidator(surveyPatchSchema, dataValidator)
export const surveyPatchResolver = resolve<SurveyPatch, HookContext>({})

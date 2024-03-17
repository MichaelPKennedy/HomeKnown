import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Photos, PhotosData, PhotosPatch, PhotosQuery } from './photos.schema'
export type { Photos, PhotosData, PhotosPatch, PhotosQuery }
import axios from 'axios'
const process = require('process')
import NodeCache from 'node-cache'
const photoCache = new NodeCache({ stdTTL: 86400 })

export interface PhotosParams extends Params {
  query: {
    city_id: number
    cityName: string
    stateName: string
  }
}

interface CityPhoto {
  url: string
  navigationUrl: string
  alt: string
  blurHash: string
  attribution: {
    photographer: string
    photographerUrl: string
  }
}

interface StateAbbreviations {
  [key: string]: string
}

export const stateAbbreviations: StateAbbreviations = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  'District of Columbia': 'DC',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
  Guam: 'GU',
  'Puerto Rico': 'PR',
  'Virgin Islands': 'VI'
}

export class PhotosService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: PhotosParams): Promise<any> {
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY
    const { cityName, stateName, city_id } = params.query
    const cacheKey = `photos-${city_id}`

    let cachedPhotos = photoCache.get<CityPhoto[]>(cacheKey)
    if (cachedPhotos) {
      console.log('Returning cached photos for', cacheKey)
      return cachedPhotos
    }

    const stateAbbrev = stateAbbreviations[stateName]
    const excludedTags = [
      'woman',
      'adult only',
      'person',
      'one person',
      'man',
      'one man',
      'one man only',
      'one woman',
      'one woman only',
      'boy',
      'girl',
      'adult',
      'human',
      'auto',
      'vehicle',
      'car',
      'automobile',
      'car images & pictures',
      'nude',
      'erotic',
      'sexy',
      'intimate',
      'car',
      'motorcycle',
      'bike',
      'alcohol',
      'drink',
      'nightlife',
      'animal photography',
      'puppy photo',
      'macys',
      'grey',
      'earthquake',
      'sweets',
      'pastries',
      'pastry',
      'dessert',
      'food',
      'citrus fruit',
      'skewers'
    ]

    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        headers: {
          Authorization: `Client-ID ${unsplashAccessKey}`
        },
        params: {
          query: `${cityName} ${stateName}`,
          per_page: 30
        }
      })

      const photos = response.data.results
        .filter((photo: any) => {
          const description = photo.description ? photo.description.toLowerCase() : ''
          const altDescription = photo.alt_description ? photo.alt_description.toLowerCase() : ''
          const unsplashNavigationUrl = photo.links.html.toLowerCase() || ''

          const hasExcludedTag = photo.tags.some((tag: any) => excludedTags.includes(tag.title))
          if (hasExcludedTag) return false

          const allText = [
            description,
            altDescription,
            unsplashNavigationUrl,
            ...photo.tags.map((tag: any) => tag.title.toLowerCase())
          ].join(' ')

          const containsExcludedWord = excludedTags.some((excludedWord) =>
            new RegExp(`\\b${excludedWord.toLowerCase()}\\b`).test(allText)
          )
          if (containsExcludedWord) return false

          const cityNameLower = cityName.toLowerCase()
          const stateNameLower = stateName.toLowerCase()
          const stateAbbrevLower = stateAbbrev.toLowerCase()

          const cityMatch = allText.includes(cityNameLower)
          const stateMatch =
            allText.includes(stateNameLower) ||
            new RegExp(
              `\\b${stateAbbrevLower}\\b|,\\s*${stateAbbrevLower}\\s*,|${stateAbbrevLower}\\.|\\s${stateAbbrevLower}\\s`,
              'i'
            ).test(allText)

          return cityMatch && stateMatch
        })
        .map((photo: any) => ({
          url: photo.urls.full,
          reg_url: photo.urls.regular,
          navigationUrl: photo.links.html,
          alt: photo.alt_description,
          blurHash: photo.blur_hash,
          attribution: {
            photographer: photo.user.name,
            photographerUrl: photo.user.links.html
          }
        }))
      photoCache.set(cacheKey, photos)
      return photos
    } catch (error) {
      console.error('Error fetching photos from Unsplash:', error)
      return []
    }
  }

  async get(id: Id, params?: PhotosParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: PhotosParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: PhotosParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: PhotosParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: PhotosParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

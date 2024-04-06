import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Realty, RealtyData, RealtyPatch, RealtyQuery } from './realty.schema'
import NodeCache from 'node-cache'
const myCache = new NodeCache({ stdTTL: 86400 }) // 24 hours
const process = require('process')
import axios from 'axios'
import { Op } from 'sequelize'

export type { Realty, RealtyData, RealtyPatch, RealtyQuery }

type PropertyType =
  | 'apartment'
  | 'condo_townhome'
  | 'condo_townhome_rowhome_coop'
  | 'condop'
  | 'condos'
  | 'coop'
  | 'duplex_triplex'
  | 'farm'
  | 'land'
  | 'mobile'
  | 'multi_family'
  | 'single_family'
  | 'townhomes'
export interface RealtyParams extends Params {
  query: {
    state_code: string
    city: string
    propertyStatus: 'rent' | 'buy' | 'sold'
    priceMin?: number
    priceMax?: number
    soldPriceMin?: number
    soldPriceMax?: number
    bedsMin?: number
    bedsMax?: number
    bathsMin?: number
    bathsMax?: number
    foreclosure?: boolean
    cats?: boolean
    dogs?: boolean
    type?: PropertyType[]
    limit?: number
  }
}

interface DataOptions {
  limit: number
  offset: number
  state_code?: string
  city?: string
  status: string[]
  sort: {
    direction: string
    field: string
  }
  list_price?: {
    min: number
    max: number
  }
  beds?: {
    min: number
    max: number
  }
  baths?: {
    min: number
    max: number
  }
  sold_price?: {
    min: number
    max: number
  }
  foreclosure?: boolean
  pet_policy?: {
    cats?: boolean
    dogs?: boolean
  }
  type?: string[]
}

function generateCacheKey(params: RealtyParams['query']): string {
  const parts = []
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      let value: any = (params as any)[key]
      if (Array.isArray(value)) {
        value = value.sort().join(',')
      }
      parts.push(`${key}:${value}`)
    }
  }
  return parts.join('|')
}

export class RealtyService implements ServiceMethods<any> {
  app: Application
  sequelize: any

  constructor(app: Application, sequelizeClient: any) {
    this.app = app
    this.sequelize = sequelizeClient
  }

  async find(params: RealtyParams): Promise<any> {
    const query = params.query || {}
    const cacheKey = generateCacheKey(query)
    const cachedResult = myCache.get(cacheKey)
    if (cachedResult) {
      return cachedResult
    }

    const {
      state_code,
      city,
      type,
      priceMin,
      priceMax,
      soldPriceMin,
      soldPriceMax,
      bedsMin,
      bedsMax,
      bathsMin,
      bathsMax,
      foreclosure,
      cats,
      dogs,
      propertyStatus,
      limit = 500
    } = query || {}

    const statusMap: { [key: string]: string[] } = {
      rent: ['for_rent'],
      buy: ['for_sale'],
      sold: ['sold']
    }

    const status = statusMap[propertyStatus || 'buy']

    let data: DataOptions = {
      limit,
      offset: 0,
      state_code,
      city,
      status,
      sort: {
        direction: 'desc',
        field: 'list_date'
      }
    }

    if (priceMin && priceMax) data = { ...data, list_price: { min: Number(priceMin), max: Number(priceMax) } }
    if (bedsMin && bedsMax) data = { ...data, beds: { min: Number(bedsMin), max: Number(bedsMax) } }
    if (bathsMin && bathsMax) data = { ...data, baths: { min: Number(bathsMin), max: Number(bathsMax) } }
    if (soldPriceMin && soldPriceMax)
      data = { ...data, sold_price: { min: Number(soldPriceMin), max: Number(soldPriceMax) } }
    if (foreclosure) data = { ...data, foreclosure }
    if (cats) data = { ...data, pet_policy: { cats } }
    if (dogs) data = { ...data, pet_policy: { dogs } }
    if (type) data = { ...data, type }

    const options = {
      method: 'POST',
      url: 'https://realty-in-us.p.rapidapi.com/properties/v3/list',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
      },
      data
    }

    try {
      const response = await axios.request(options)
      myCache.set(cacheKey, response.data, 10000)
      return response.data
    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch property data')
    }
  }

  async get(propertyId: string, params?: any): Promise<any> {
    const cacheKey = `property:${propertyId}`
    const cachedResult = myCache.get(cacheKey)
    if (cachedResult) {
      return cachedResult
    }

    const options = {
      method: 'GET',
      url: 'https://realty-in-us.p.rapidapi.com/properties/v3/detail',
      params: { property_id: propertyId },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
      }
    }

    try {
      const response = await axios.request(options)
      myCache.set(cacheKey, response.data, 10000)
      return response.data
    } catch (error) {
      console.error('Error fetching property details:', error)
      throw new Error('Failed to fetch property details')
    }
  }

  async create(data: any, params?: RealtyParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: RealtyParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: RealtyParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: RealtyParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

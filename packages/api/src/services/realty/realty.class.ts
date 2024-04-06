import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import type { Application } from '../../declarations'
import type { Realty, RealtyData, RealtyPatch, RealtyQuery } from './realty.schema'
import NodeCache from 'node-cache'
const myCache = new NodeCache({ stdTTL: 86400 }) // 24 hours
const process = require('process')
import axios from 'axios'
import { Op } from 'sequelize'

export type { Realty, RealtyData, RealtyPatch, RealtyQuery }

export interface RealtyParams extends Params {
  query?: {
    state_code: string
    city: string
    propertyStatus: 'rent' | 'buy' | 'sold'
    priceMin?: number
    priceMax?: number
    radius?: number
    foreclosure?: boolean
    cats?: boolean
    dogs?: boolean
    type?: string[]
    limit?: number
  }
}

interface DataOptions {
  limit: number
  offset: number
  state_code?: string
  city?: string
  status: string[]
  radius: number
  sort: {
    direction: string
    field: string
  }
  list_price?: {
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

      // For arrays, sort them to ensure consistent key order
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
    const {
      state_code,
      city,
      type,
      priceMin,
      priceMax,
      radius = 15,
      foreclosure,
      cats,
      dogs,
      propertyStatus,
      limit = 500
    } = params.query || {}

    const statusMap: { [key: string]: string[] } = {
      rent: ['for_rent'],
      buy: ['for_sale'],
      sold: ['sold']
    }

    const status = statusMap[propertyStatus || 'buy']

    const cacheKey = `${state_code}-${city}-${status.join(',')}`
    const cachedResult = myCache.get(cacheKey)
    if (cachedResult) return cachedResult

    let data: DataOptions = {
      limit,
      offset: 0,
      state_code,
      city,
      status,
      radius,
      sort: {
        direction: 'desc',
        field: 'list_date'
      }
    }

    if (priceMin && priceMax) data = { ...data, list_price: { min: priceMin, max: priceMax } }
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

  async get(id: Id, params?: any): Promise<any> {
    throw new Error('Method not implemented.')
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

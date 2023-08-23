import type { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers'
import axios from 'axios'
import type { Application } from '../../declarations'

interface QueryParams {
  query: string
}

export interface PlacesParams extends Params {
  query?: QueryParams
}

export class PlacesService implements ServiceMethods<any> {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async find(params: PlacesParams): Promise<any[] | Paginated<any>> {
    // Extract the query parameter from the params
    const query = params.query?.query

    if (!query) {
      throw new Error('A query parameter is required.')
    }

    // Here, GOOGLE_API_KEY is a placeholder. Replace it with your key or a method to retrieve it.
    const apiKey = process.env.GOOGLE_API_KEY
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`

    try {
      const response = await axios.get(url)
      return response.data
    } catch (error: any) {
      throw new Error(
        error.response ? error.response.data.error_message : 'Failed to fetch data from Google Places API'
      )
    }
  }

  async get(id: Id, params?: PlacesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async create(data: any, params?: PlacesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async update(id: NullableId, data: any, params?: PlacesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async patch(id: NullableId, data: any, params?: PlacesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async remove(id: NullableId, params?: PlacesParams): Promise<any> {
    throw new Error('Method not implemented.')
  }
}

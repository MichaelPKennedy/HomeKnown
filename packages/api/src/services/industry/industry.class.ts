const { Service } = require('feathers-sequelize')

class Industry extends Service {
  async find(params) {
    const { query } = params
    const { jobIndustry, salary } = query // adjust this if the query params are named differently

    // Define the search query
    let searchQuery = {
      where: {
        naics_code: jobIndustry, // assuming naics_code represents job industry
        average_salary: { [this.app.get('sequelize').Op.gte]: salary } // adjust this logic based on requirements
      },
      order: [['average_salary', 'DESC']], // order by salary descending
      limit: 10 // get top 10
    }

    const results = await super.find({ query: searchQuery })

    // Assuming you have another table or service to get state names by state_code
    // If you have a model or service for states, you can map the results to add state names.

    return results
  }
}

module.exports = Industry

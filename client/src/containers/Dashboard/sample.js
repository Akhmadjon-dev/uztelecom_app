import moment from 'moment'

export default (period = 'today', data = []) => {
  console.log(data)

  if (period === 'today') {
    const dayObj = {}
    let total = 0
    const result = []
    const week = moment().startOf('day')

    for (let i = 0; i <= 24; i += 3) {
      const dayStart = week
        .hour(i)
        .startOf('hour')
        .valueOf()
      const dayEnd = week
        .hour(i)
        .endOf('hour')
        .valueOf()
      const dayName = week.hour(i).format('HH')

      if (!data.length) {
        result.push({ name: [dayName], amount: 0 })
      }

      data.forEach(item => {
        if (
          dayStart <= item.updatedAt &&
          dayEnd >= item.updatedAt &&
          item.status === 'delivered'
        ) {
          total += item.total
          if (dayName in dayObj) {
            dayObj[dayName].amount += item.total
          } else {
            dayObj[dayName] = { amount: item.total }
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { amount: 0 }
        }
      })
    }
    // Convert object to array
    if (data.length) {
      Object.keys(dayObj).forEach(x =>
        result.push({ name: x, amount: dayObj[x].amount })
      )
    }
    console.log(dayObj, result)

    return {
      result,
      paymentPeriod: {
        start: moment()
          .startOf('day')
          .format('DD MMMM'),
        end: moment()
          .endOf('day')
          .format('DD MMMM')
      },
      total
    }
  } else if (period === 'week') {
    const dayObj = {}
    let total = 0
    const result = []
    const week = moment().startOf('isoWeek')

    for (let i = 1; i <= 7; i++) {
      const dayStart = week
        .day(i)
        .startOf('day')
        .valueOf()
      const dayEnd = week
        .day(i)
        .endOf('day')
        .valueOf()
      const dayName = week.day(i).format('ddd')

      if (!data.length) {
        result.push({ name: [dayName], amount: 0 })
      }

      data.forEach(item => {
        if (
          dayStart <= item.updatedAt &&
          dayEnd >= item.updatedAt &&
          item.status === 'delivered'
        ) {
          total += item.total
          if (dayName in dayObj) {
            dayObj[dayName].amount += item.total
          } else {
            dayObj[dayName] = { amount: item.total }
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { amount: 0 }
        }
      })
    }
    // Convert object to array
    if (data.length) {
      Object.keys(dayObj).forEach(x =>
        result.push({ name: x, amount: dayObj[x].amount })
      )
    }

    return {
      result,
      paymentPeriod: {
        start: moment()
          .startOf('isoWeek')
          .format('DD MMMM'),
        end: moment()
          .endOf('isoWeek')
          .format('DD MMMM')
      },
      total
    }
  }
  if (period === 'month') {
    const dayObj = {}
    const result = []
    let total = 0
    const numOfDaysInMonth = moment().daysInMonth()

    for (let i = 1; i <= numOfDaysInMonth; i++) {
      const dayStart = moment()
        .date(i)
        .startOf('day')
        .valueOf()
      const dayEnd = moment()
        .date(i)
        .endOf('day')
        .valueOf()
      const dayName = moment()
        .date(i)
        .format('DD')

      if (!data.length) {
        result.push({ name: [dayName], amount: 0 })
      }
      data.forEach(item => {
        if (
          dayStart <= item.updatedAt &&
          dayEnd >= item.updatedAt &&
          item.status === 'delivered'
        ) {
          total += item.total
          if (dayName in dayObj) {
            dayObj[dayName].amount += item.total
          } else {
            dayObj[dayName] = { amount: item.total }
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { amount: 0 }
        }
      })
    }

    if (data.length) {
      Object.keys(dayObj)
        .sort((a, b) => a - b)
        .forEach(x => result.push({ name: x, amount: dayObj[x].amount }))
    }

    return {
      result,
      paymentPeriod: {
        start: moment()
          .startOf('month')
          .format('DD MMMM'),
        end: moment()
          .endOf('month')
          .format('DD MMMM')
      },
      total
    }
  }
  if (period === 'lastMonth') {
    const dayObj = {}
    const result = []
    let total = 0
    const numOfDaysInMonth = moment()
      .subtract(1, 'months')
      .daysInMonth()
    const lastMonth = moment().subtract(1, 'months')

    for (let i = 1; i <= numOfDaysInMonth; i++) {
      const dayStart = lastMonth
        .date(i)
        .startOf('day')
        .valueOf()
      const dayEnd = lastMonth
        .date(i)
        .endOf('day')
        .valueOf()
      const dayName = lastMonth.date(i).format('DD')

      if (!data.length) {
        result.push({ name: [dayName], amount: 0 })
      }

      data.forEach(item => {
        if (
          dayStart <= item.updatedAt &&
          dayEnd >= item.updatedAt &&
          item.status === 'delivered'
        ) {
          total += item.total
          if (dayName in dayObj) {
            dayObj[dayName].amount += item.total
          } else {
            dayObj[dayName] = { amount: item.total }
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { amount: 0 }
        }
      })
    }

    if (data.length) {
      Object.keys(dayObj)
        .sort((a, b) => a - b)
        .forEach(x => result.push({ name: x, amount: dayObj[x].amount }))
    }

    return {
      result,
      paymentPeriod: {
        start: moment()
          .subtract(1, 'months')
          .startOf('month')
          .format('DD MMMM'),
        end: moment()
          .subtract(1, 'months')
          .endOf('month')
          .format('DD MMMM')
      },
      total
    }
  }
  if (period === 'quater') {
    const dayObj = {}
    const result = []
    let total = 0

    for (let i = 3; i >= 1; i--) {
      const dayStart = moment()
        .subtract(i, 'months')
        .startOf('month')
        .valueOf()
      const dayEnd = moment()
        .subtract(i, 'months')
        .endOf('month')
        .valueOf()
      const dayName = moment()
        .subtract(i, 'months')
        .format('MMM')

      if (!data.length) {
        result.push({ name: [dayName], amount: 0 })
      }

      data.forEach(item => {
        if (
          dayStart <= item.updatedAt &&
          dayEnd >= item.updatedAt &&
          item.status === 'delivered'
        ) {
          total += item.total
          if (dayName in dayObj) {
            dayObj[dayName].amount += item.total
          } else {
            dayObj[dayName] = { amount: item.total }
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { amount: 0 }
        }
      })
    }

    if (data.length) {
      Object.keys(dayObj).forEach(x =>
        result.push({ name: x, amount: dayObj[x].amount })
      )
    }

    return {
      result,
      paymentPeriod: {
        start: moment()
          .subtract(3, 'months')
          .startOf('month')
          .format('DD MMMM'),
        end: moment()
          .subtract(1, 'months')
          .endOf('month')
          .format('DD MMMM')
      },
      total
    }
  }
  if (period === 'semi') {
    const dayObj = {}
    const result = []
    let total = 0


    for (let i = 6; i >= 1; i--) {
      const dayStart = moment()
        .subtract(i, 'months')
        .startOf('month')
        .valueOf()
      const dayEnd = moment()
        .subtract(i, 'months')
        .endOf('month')
        .valueOf()
      const dayName = moment()
        .subtract(i, 'months')
        .format('MMM')

      if (!data.length) {
        result.push({ name: [dayName], amount: 0 })
      }

      data.forEach(item => {
        if (
          dayStart <= item.updatedAt &&
          dayEnd >= item.updatedAt &&
          item.status === 'delivered'
        ) {
          total += item.total
          if (dayName in dayObj) {
            dayObj[dayName].amount += item.total
          } else {
            dayObj[dayName] = { amount: item.total }
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { amount: 0 }
        }
      })
    }

    if (data.length) {
      Object.keys(dayObj).forEach(x =>
        result.push({ name: x, amount: dayObj[x].amount })
      )
    }

    return {
      result,
      paymentPeriod: {
        start: moment()
          .subtract(6, 'months')
          .startOf('month')
          .format('DD MMMM'),
        end: moment()
          .subtract(1, 'months')
          .endOf('month')
          .format('DD MMMM')
      },
      total
    }
  }
  if (period === 'annual') {
    const dayObj = {}
    const result = []
    let total = 0

    for (let i = 12; i >= 1; i--) {
      const dayStart = moment()
        .subtract(i, 'months')
        .startOf('month')
        .valueOf()
      const dayEnd = moment()
        .subtract(i, 'months')
        .endOf('month')
        .valueOf()
      ///////
      const dayName = moment()
        .subtract(i, 'months')
        .format('MMM')

      if (!data.length) {
        result.push({ name: [dayName], amount: 0 })
      }

      data.forEach(item => {
        if (
          dayStart <= item.updatedAt &&
          dayEnd >= item.updatedAt &&
          item.status === 'delivered'
        ) {
          total += item.total
          if (dayName in dayObj) {
            dayObj[dayName].amount += item.total
          } else {
            dayObj[dayName] = { amount: item.total }
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { amount: 0 }
        }
      })
    }

    if (data.length) {
      Object.keys(dayObj).forEach(x =>
        result.push({ name: x, amount: dayObj[x].amount })
      )
    }

    return {
      result,
      paymentPeriod: {
        start: moment()
          .subtract(12, 'months')
          .startOf('month')
          .format('DD MMM YYYY'),
        end: moment()
          .subtract(1, 'months')
          .endOf('month')
          .format('DD MMM YYYY')
      },
      total
    }
  }
}

/////
periodHandler = async period => {
  // initial === today
  let start = moment().startOf('day')
  let end = moment().endOf('day')
  if (period === 'today') {
    start = moment().startOf('day')
    end = moment().endOf('day')
  } else if (period === 'week') {
    start = moment().startOf('isoWeek')
    end = moment().endOf('isoWeek')
  } else if (period === 'month') {
    start = moment().startOf('month')
    end = moment().endOf('month')
  } else if (period === 'lastMonth') {
    start = moment()
      .subtract(1, 'months')
      .startOf('month')
    end = moment()
      .subtract(1, 'months')
      .endOf('month')
  } else if (period === 'quater') {
    start = moment()
      .subtract(3, 'months')
      .startOf('month')
    end = moment()
      .subtract(1, 'months')
      .endOf('month')
  } else if (period === 'semi') {
    start = moment()
      .subtract(6, 'months')
      .startOf('month')
    end = moment()
      .subtract(1, 'months')
      .endOf('month')
  } else {
    start = moment()
      .subtract(12, 'months')
      .startOf('month')
    end = moment()
      .subtract(1, 'months')
      .endOf('month')
  }

  await this.props.fetchDashboardAction(
    `/dashboard?from=${start.valueOf()}&to=${end.valueOf()}`
  )
  const sale = dayLogic(period, this.props.dashboard.sales)
  const { result, ...saleData } = sale
  this.setState({
    ...this.props.dashboard.data,
    period,
    payments: result,
    ...saleData
  })
}
//////

exports.fetchAll = (req, res) => {
  const startDate = moment()
    .startOf('isoWeek')
    .valueOf()
  const endDate = moment()
    .endOf('isoWeek')
    .valueOf()
  const { from = startDate, to = endDate } = req.query
  console.log(req.query)

  const query = { updatedAt: { $gte: from, $lte: to } }

  const orders = Orders.find(query)
  const sales = Sales.find(query).populate(
    'product',
    'salePrice, price, quantity'
  )
  const customers = Customers.find(query)
  const products = Products.find(query)

  return Promise.all([orders, sales, customers, products])
    .then(dataList => {
      const [orders, sales, customers, products] = dataList
      res.json({
        payload: {
          orders,
          sales,
          customers,
          products
        },
        success: true
      })
    })
    .catch(err => res.json({ msg: err.message, success: false }))
}

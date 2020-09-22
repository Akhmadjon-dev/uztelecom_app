const Locations = require("../models/locations");
const moment = require("moment");

const findPeriod = (period = "thisYear", data = []) => {
  if (period === "week") {
    const dayObj = {};
    const result = [];
    let totalFinished = 0;
    let totalProgres = 0;
    let totalUnFinished = 0;
    const week = moment().startOf("isoWeek");
    for (let i = 1; i <= 7; i++) {
      const dayStart = week.day(i).startOf("day").valueOf();

      const dayEnd = week.day(i).endOf("day").valueOf();

      const dayName = week.day(i).format("ddd");

      if (!data.length) {
        result.push({
          name: [dayName],
          finished: 0,
          unfinished: 0,
          progress: 0,
        });
      }

      data.forEach((item) => {
        if (dayStart <= item.deadline && dayEnd >= item.deadline) {
          const finished = item.isFinished == "true" ? 1 : 0;
          const unfinished = item.isfinished == "false" ? 1 : 0;
          const progress = item.isFinished == "progress" ? 1 : 0;
          totalFinished += finished;
          totalUnFinished += unfinished;
          totalProgres += progress;
          if (dayName in dayObj) {
            dayObj[dayName].finished += finished;
            dayObj[dayName].unfinished += unfinished;
            dayObj[dayName].progress += progress;
          } else {
            dayObj[dayName] = {
              finished,
              unfinished,
              progress,
            };
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { finished: 0, unfinished: 0, progress: 0 };
        }
      });
    }
    if (data.length) {
      Object.keys(dayObj)
        .sort((a, b) => a - b)
        .forEach((item) =>
          result.push({
            name: item,
            finished: dayObj[item].finished,
            progress: dayObj[item].progress,
            unfinished: dayObj[item].unfinished,
          })
        );
    }
    return {
      result,
      total: {
        totalFinished,
        totalUnFinished,
        totalProgres,
      },
      date: {
        start: moment().startOf("isoWeek").format("DD MMMM"),
        end: moment().endOf("isoWeek").format("DD MMMM"),
      },
    };
  }
  if (period === "month") {
    const dayObj = {};
    const result = [];
    let totalFinished = 0;
    let totalProgres = 0;
    let totalUnFinished = 0;

    const numOfDaysInMonth = moment().daysInMonth();
    // const lastMonth = moment().subtract(1, "months");

    for (let i = 1; i <= numOfDaysInMonth; i++) {
      const dayStart = moment().date(i).startOf("day").valueOf();

      const dayEnd = moment().date(i).endOf("day").valueOf();

      const dayName = moment().date(i).format("DD");

      if (!data.length) {
        result.push({
          name: [dayName],
          finished: 0,
          unfinished: 0,
          progress: 0,
        });
      }

      data.forEach((item) => {
        if (dayStart <= item.deadline && dayEnd >= item.deadline) {
          const finished = item.isFinished == "true" ? 1 : 0;
          const unfinished = item.isFinished == "false" ? 1 : 0;
          const progress = item.isFinished == "progress" ? 1 : 0;
          totalFinished += finished;
          totalUnFinished += unfinished;
          totalProgres += progress;
          if (dayName in dayObj) {
            dayObj[dayName].finished += finished;
            dayObj[dayName].unfinished += unfinished;
            dayObj[dayName].progress += progress;
          } else {
            dayObj[dayName] = {
              finished,
              unfinished,
              progress,
            };
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { finished: 0, unfinished: 0, progress: 0 };
        }
      });
    }
    if (data.length) {
      Object.keys(dayObj)
        .sort((a, b) => a - b)
        .forEach((item) =>
          result.push({
            name: item,
            finished: dayObj[item].finished,
            progress: dayObj[item].progress,
            unfinished: dayObj[item].unfinished,
          })
        );
    }
    return {
      result,
      total: {
        totalFinished,
        totalUnFinished,
        totalProgres,
      },
      date: {
        start: moment().startOf("month").format("DD MMMM"),
        end: moment().endOf("month").format("DD MMMM"),
      },
    };
  }
  if (period === "lastMonth") {
    const dayObj = {};
    const result = [];
    let totalFinished = 0;
    let totalProgres = 0;
    let totalUnFinished = 0;

    const numOfDaysInMonth = moment().subtract(1, "month").daysInMonth();
    const lastMonth = moment().subtract(1, "months");

    for (let i = 1; i <= numOfDaysInMonth; i++) {
      const dayStart = lastMonth.date(i).startOf("day").valueOf();

      const dayEnd = lastMonth.date(i).endOf("day").valueOf();

      const dayName = lastMonth.date(i).format("DD");

      if (!data.length) {
        result.push({
          name: [dayName],
          finished: 0,
          unfinished: 0,
          progress: 0,
        });
      }

      data.forEach((item) => {
        if (dayStart <= item.deadline && dayEnd >= item.deadline) {
          const finished = item.isFinished == "true" ? 1 : 0;
          const unfinished = item.isFinished == "false" ? 1 : 0;
          const progress = item.isFinished == "progress" ? 1 : 0;
          totalFinished += finished;
          totalUnFinished += unfinished;
          totalProgres += progress;
          if (dayName in dayObj) {
            dayObj[dayName].finished += finished;
            dayObj[dayName].unfinished += unfinished;
            dayObj[dayName].progress += progress;
          } else {
            dayObj[dayName] = {
              finished,
              unfinished,
              progress,
            };
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { finished: 0, unfinished: 0, progress: 0 };
        }
      });
    }
    if (data.length) {
      Object.keys(dayObj)
        .sort((a, b) => a - b)
        .forEach((item) =>
          result.push({
            name: item,
            finished: dayObj[item].finished,
            progress: dayObj[item].progress,
            unfinished: dayObj[item].unfinished,
          })
        );
    }
    return {
      result,
      total: {
        totalFinished,
        totalUnFinished,
        totalProgres,
      },
      date: {
        start: moment()
          .subtract(1, "months")
          .startOf("month")
          .format("DD MMMM"),
        end: moment().subtract(1, "months").endOf("month").format("DD MMMM"),
      },
    };
  }
  if (period === "quater") {
    const dayObj = {};
    const result = [];
    let totalFinished = 0;
    let totalProgres = 0;
    let totalUnFinished = 0;

    for (let i = 3; i >= 1; i--) {
      const dayStart = moment()
        .subtract(i, "months")
        .startOf("month")
        .valueOf();

      const dayEnd = moment().subtract(i, "months").endOf("month").valueOf();

      const dayName = moment().subtract(i, "months").format("MMM");

      if (!data.length) {
        result.push({
          name: [dayName],
          finished: 0,
          unfinished: 0,
          progress: 0,
        });
      }

      data.forEach((item) => {
        if (dayStart <= item.deadline && dayEnd >= item.deadline) {
          const finished = item.isFinished == "true" ? 1 : 0;
          const unfinished = item.isFinished == "false" ? 1 : 0;
          const progress = item.isFinished == "progress" ? 1 : 0;
          totalFinished += finished;
          totalUnFinished += unfinished;
          totalProgres += progress;
          if (dayName in dayObj) {
            dayObj[dayName].finished += finished;
            dayObj[dayName].unfinished += unfinished;
            dayObj[dayName].progress += progress;
          } else {
            dayObj[dayName] = {
              finished,
              unfinished,
              progress,
            };
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { finished: 0, unfinished: 0, progress: 0 };
        }
      });
    }
    if (data.length) {
      Object.keys(dayObj)
        .sort((a, b) => a - b)
        .forEach((item) =>
          result.push({
            name: item,
            finished: dayObj[item].finished,
            progress: dayObj[item].progress,
            unfinished: dayObj[item].unfinished,
          })
        );
    }
    return {
      result,
      total: {
        totalFinished,
        totalUnFinished,
        totalProgres,
      },
      date: {
        start: moment()
          .subtract(3, "months")
          .startOf("month")
          .format("DD MMMM"),
        end: moment().subtract(1, "months").endOf("month").format("DD MMMM"),
      },
    };
  }
  if (period === "thisYear") {
    const dayObj = {};
    const result = [];
    let totalFinished = 0;
    let totalProgres = 0;
    let totalUnFinished = 0;

    const semi = moment().startOf("years");
    for (let i = 0; i <= moment().month(); i++) {
      const dayStart = semi.month(i).startOf("month").valueOf();

      const dayEnd = semi.month(i).endOf("month").valueOf();

      const dayName = semi.month(i).format("MMM");

      if (!data.length) {
        result.push({
          name: [dayName],
          finished: 0,
          unfinished: 0,
          progress: 0,
        });
      }

      data.forEach((item) => {
        if (dayStart <= item.deadline && dayEnd >= item.deadline) {
          const finished = item.isFinished == "true" ? 1 : 0;
          const unfinished = item.isFinished == "false" ? 1 : 0;
          const progress = item.isFinished == "progress" ? 1 : 0;
          totalFinished += finished;
          totalUnFinished += unfinished;
          totalProgres += progress;
          if (dayName in dayObj) {
            dayObj[dayName].finished += finished;
            dayObj[dayName].unfinished += unfinished;
            dayObj[dayName].progress += progress;
          } else {
            dayObj[dayName] = {
              finished,
              unfinished,
              progress,
            };
          }
        } else if (!(dayName in dayObj)) {
          dayObj[dayName] = { finished: 0, unfinished: 0, progress: 0 };
        }
      });
    }
    if (data.length) {
      Object.keys(dayObj)
        .sort((a, b) => a - b)
        .forEach((item) =>
          result.push({
            name: item,
            finished: dayObj[item].finished,
            progress: dayObj[item].progress,
            unfinished: dayObj[item].unfinished,
          })
        );
    }
    return {
      result,
      total: {
        totalFinished,
        totalUnFinished,
        totalProgres,
      },
      date: {
        start: moment().startOf("year").format("DD MMMM"),
        end: moment().month("month").endOf("month").format("DD MMMM"),
      },
    };
  }
};

exports.fetchAll = (req, res) => {
  const { period } = req.body;
  Locations.find({ isDeleted: false })

    .then((locations) => {
      res.json({
        info: findPeriod(period, locations),
      });
    })
    .catch((err) => res.send(err));
};
exports.fetchByRegion = (req, res) => {
  const { region, type, period } = req.query;
  let query = {};
  if (region && type) {
    query = { isDeleted: false, region: region, type: type };
  } else if (region || type == false) {
    query = { isDeleted: false, region: region };
  } else if (type || region == false) {
    query = { isDeleted: false, type: type };
  } else {
    query = { isDeleted: false };
  }
  Locations.find(query)

    .then((locations) => {
      res.json({
        info: findPeriod(period, locations),
      });
    })
    .catch((err) => res.send(err));
};
exports.fetchMap = (req, res) => {
  Locations.find({ isDeleted: false })

    .then((locations) => {
      res.json(locations);
    })
    .catch((err) => res.send(err));
};

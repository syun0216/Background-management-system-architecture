import { getIndexData } from '../../../api/smart_city_index'
import { changeNewDataType } from '../../macroindex/utils/common'
import { area_name_filter, index_name_flter, cal_name_filter, dur_name_filter, extra_name_filter } from '../../../filters'
import { compareSameArrayOrObject } from '../../../utils/common_utils'

export function raw_data_to_echart(searchParams, callback) {
  let _obj = { key: '', type: 'in', value: null }
  const search_arr = []
  const callbackName = (data, type) => {
    switch (type) {
      case 'area': searchParams.area_obj = data; break
      case 'index': searchParams.index_obj = data; break
      case 'cal': searchParams.cal_obj = data; break
      case 'dur': searchParams.dur_obj = data; break
      case 'extra': searchParams.extra_obj = data; break
    }
  }
  for (const i in searchParams) {
    if (i !== 'echartType' && i !== 'typeX' && i !== 'typeY' && i !== 'dim_extra' && i !== 'chooseRow' &&
  i !== 'dim_cal' && i !== 'dim_dur') {
      _obj.key = i
      _obj.value = searchParams[i].slice()
      search_arr.push(_obj)
      _obj = { key: '', type: 'in', value: null }
    }
  }
  area_name_filter(searchParams.area_code, callbackName)
  index_name_flter(searchParams.index_code, callbackName)
  dur_name_filter(null, callbackName)
  cal_name_filter(null, callbackName)
  extra_name_filter(null, callbackName)
  console.log(searchParams)
  getIndexData(search_arr).then(sdata => {
    // console.log('_column', columns)
    // console.log('_data', data)
    // console.log('_column_choose', column_choose)
    const _data = sdata.data
    _data.forEach((val, idx) => {
      val.index_name = searchParams.index_obj[val.index_code].INDEX_NAME
      val.area_name = searchParams.area_obj[val.area_code].area_name
      val.cal_code = val.dim_cal
      val.dim_cal = searchParams.cal_obj[val.dim_cal].cal_name
      // val.dur_code = val.dim_dur
      // console.log(searchParams.dim_obj)
      val.dim_dur = searchParams.dur_obj[val.dim_dur].dur_name
      // val.extra_code = val.dim_extra
      // val.dim_extra = searchParams.extra_obj[val.dim_extra].extra_name
    })
    const {
      data,
      column_choose
    } = changeNewDataType(searchParams.typeY, searchParams.typeX, _data)
    // console.log('_column', columns)
    // console.log('_data', data)
    // console.log('_column_choose', column_choose)
    const filter_data = []
    data.forEach((dval, didx) => {
      searchParams.chooseRow.forEach((val, idx) => {
        if (searchParams.typeY === 'index') {
          if (dval.index_code === val.index_code && dval.index_name == val.index_name && dval.dim_dur == val.dim_dur && dval.dim_cal == val.dim_cal && dval.unit == val.unit) {
            filter_data.push(dval)
          }
        } else if (searchParams.typeY === 'area') {
          if (dval.area_code == val.area_code && dval.area_name == val.area_name && dval.dim_dur == val.dim_dur && dval.dim_cal == val.dim_cal && dval.unit == val.unit) {
            filter_data.push(dval)
          }
        } else if (searchParams.typeY === 'time') {
          if (compareSameArrayOrObject(dval.occur_year_period, val.occur_year_period) && compareSameArrayOrObject(dval.occur_month_period, val.occur_month_period) && dval.time_name == val.time_name && dval.dim_dur == val.dim_dur && dval.dim_cal == val.dim_cal && dval.unit == val.unit) {
            filter_data.push(dval)
          }
        }
      //   if (dval.index_name == val.index_name && dval.area_name == val.area_name && dval.time_name == val.time_name &&
      // dval.dim_cal == val.dim_cal && dval.dim_dur == val.dim_dur && dval.unit == val.unit) {
      //     filter_data.push(dval)
      //   }
      })
    })
    console.log('_data', data)
    console.log('filter_data', filter_data)
    let _obj = { name: '', type: searchParams.echartType, data: [], oldData: [] }
    const xAxis = column_choose
    const series = []
    let legend = []
    filter_data.forEach((val, idx) => {
      for (const i in val) {
        if (column_choose.indexOf(i) > -1) {
          if (val[i] === '-') {
            val[i] = '0'
          }
          _obj.oldData.push({ name: i, data: val[i].split('(')[0] })
        }
      }
      if (val.dim_extra === null) {
        val.dim_extra = ''
      }
      if (searchParams.typeY === 'index') {
        _obj.name = val.index_name + ' ' + val.dim_dur + ' ' + val.dim_cal + val.dim_extra + '(' + val.unit + ')'
      } else if (searchParams.typeY === 'area') {
        _obj.name = val.area_name + ' ' + val.dim_dur + ' ' + val.dim_cal + val.dim_extra + '(' + val.unit + ')'
      } else if (searchParams.typeY === 'time') {
        _obj.name = val.time_name + ' ' + val.dim_dur + ' ' + val.dim_cal + val.dim_extra + '(' + val.unit + ')'
      }
      if (searchParams.echartType !== 'pie') {
        legend.push(_obj.name)
      } else {
        legend = column_choose
      }
      // console.log(111111, _obj)
      xAxis.forEach((val, idx) => {
        // console.log(val)
        _obj.oldData.forEach((oval, oidx) => {
          // console.log(oval)
          if (val == oval.name) {
            _obj.data.push(oval.data)
            // console.log(_obj.data)
          }
        })
      })
      series.push(_obj)
      series.forEach((val, idx) => {
        // if (series.length < 2 && val.data.length < 11) {
        //   val.barWidth = 50
        // }
        // val.barWidth = 50
        val.itemStyle = {
          normal: {
            // borderColor:'#fafafa',
            barBorderRadius: 6
            // shadowColor: 'rgba(0, 0, 0, 0.4)',
            //   shadowBlur: 20
          }
        }
      })
      _obj = { data: [], type: searchParams.echartType, oldData: [] }
    })
    callback({
      xAxis: xAxis,
      legend: legend,
      series: series,
      echartType: searchParams.echartType
    })
  })
}

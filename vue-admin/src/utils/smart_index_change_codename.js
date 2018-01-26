export function changeIndexCodeName(index_data, origin_name) {
  const data = index_data.filter((val, idx) => {
    return val.index_code === origin_name
  })
  return data[0].INDEX_NAME
}

export function changeAreaCodeName(area_data, origin_name) {
  const area_arr = [{ value: '440307000000', label: '龙岗区' },
    { value: '440360000000', label: '龙华区' },
    { value: '440303000000', label: '罗湖区' },
    { value: '440304000000', label: '福田区' },
    { value: '440308000000', label: '盐田区' },
    { value: '440306000000', label: '宝安区' },
    { value: '440361000000', label: '大鹏新区' },
    { value: '440310000000', label: '坪山区' },
    { value: '440305000000', label: '南山区' },
    // {value:'230404000000',label:'南山区'},
    { value: '440309000000', label: '光明新区' }, { value: '440300000000',
      label: '深圳市' }]
  const data = area_arr.filter((val, idx) => {
    return val.value === origin_name
  })
  // console.log(data);
  return data[0].label
}

export function changeDimCalName(origin_name) {
  let data = ''
  switch (origin_name) {
    case 'HB':data = '环比增长'; break
    case 'JDZ':data = '绝对值'; break
    case 'LDDS':data = '拉动点数'; break
    case 'SSPJZ':data = '算数平均数'; break
    case 'TB':data = '同比增长'; break
    case 'ZB':data = '占比'; break
    case 'ZZGXL':data = '增长贡献率'; break
  }
  return data
}

export const changeDimDurName = (origin_name) => {
  //  console.log("origin_name",origin_name);
  let data = ''
  switch (origin_name) {
    case 'DJ':data = '当季'; break
    case 'DNLJ':data = '当年累计'; break
    case 'DY':data = '当月'; break
    case 'LSLJ':data = '历史累计'; break
    case 'QC':data = '期初'; break
    case 'QM':data = '期末'; break
  }
  return data
}

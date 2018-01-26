const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    username: state => state.user.name,
    roles: state => state.user.roles,

    currentTableType: state => state.macro_index.currentTableType,
    barIndex: state => state.macro_index.barIndex,
    rowChoose: state => state.macro_index.rowChoose,
    columnChoose: state => state.macro_index.columnChoose,
    data_type: state => state.macro_index.data_type,
    monthkind: state => state.macro_index.monthkind,

    current_choose_data: state => state.current_choose.current_choose_data,

    currentTheme: state => state.app.currentTheme,

    departmentMap: state => state.department.departmentMap,

    IndexList: state => state.analysis.IndexList,
    currentIndex: state => state.analysis.currentIndex,
    tagIndexList: state => state.analysis.tagIndexList,
    constructid: state => state.analysis.constructid,
    drilldown: state => state.analysis.drilldown,
    showmode: state => state.analysis.showmode,
    constructionList: state => state.analysis.constructionList,
    constructeShow: state => state.analysis.constructeShow,
    currentTime: state => state.analysis.currentTime,
    TimeList: state => state.analysis.TimeList,
    TimeLevel: state => state.analysis.TimeLevel,
    region: state => state.analysis.region,
    regionList: state => state.analysis.regionList,
    areaList: state => state.analysis.areaList,
    Macro: state => state.analysis.Macro,
    industryid: state => state.analysis.industryid,
    industryidList: state => state.analysis.industryidList,
}
export default getters
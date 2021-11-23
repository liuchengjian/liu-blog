import $http from "../http.js";

/**
 * 热搜文章类型
 */
export const getHotTabs = (data)=>{
    return $http({
        url:'/hot/tabs',
		data
    });
}
export const getHotListFromTabType = (data)=>{
    return $http({
        url:'/hot/list',
		data
    });
}
